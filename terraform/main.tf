terraform {

}

provider "google" {
  region  = "us-central1"
  zone    = "us-central1-a"
  project = "halfdanjdk"
}

data "google_project" "project" {
  project_id = "halfdanjdk"
}

resource "google_storage_bucket" "assets" {
  name          = "hosting-halfdanjdk"
  location      = "US"
  storage_class = "MULTI_REGIONAL"
  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
}

resource "google_storage_bucket_iam_member" "viewer" {
  bucket = google_storage_bucket.assets.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}


resource "google_compute_backend_bucket" "assets" {
  name        = "hosting"
  description = "Contains static app assets"
  bucket_name = google_storage_bucket.assets.name
  enable_cdn  = true
}

resource "google_compute_url_map" "assets" {
  name            = "hosting"
  default_service = google_compute_backend_bucket.assets.self_link
}

resource "google_compute_global_address" "assets" {
  name = "hosting-ip"
}

resource "google_compute_global_forwarding_rule" "assets" {
  name       = "hosting-forward-rule"
  target     = google_compute_target_http_proxy.assets.self_link
  ip_address = google_compute_global_address.assets.address
  port_range = "80"
}

resource "google_compute_target_http_proxy" "assets" {
  name    = "hosting-target-proxy"
  url_map = google_compute_url_map.assets.self_link
}

resource "google_compute_target_https_proxy" "assets" {
  project          = "halfdanjdk"
  name             = "hosting-target-proxy"
  url_map          = google_compute_url_map.assets.self_link
  ssl_certificates = [google_compute_managed_ssl_certificate.assets.self_link]
}

resource "google_compute_global_forwarding_rule" "https-assets" {
  name       = "hosting-https-forward-rule"
  target     = google_compute_target_https_proxy.assets.self_link
  ip_address = google_compute_global_address.assets.address
  port_range = 443
}

resource "google_compute_managed_ssl_certificate" "assets" {
  provider = google-beta
  project  = "halfdanjdk"
  name     = "hosting-certificate"
  managed {
    domains = ["halfdanj.dk"]
  }
}




resource "google_service_account" "github_actions" {
  account_id   = "github-actions"
  display_name = "github-actions"
  description  = "Github actions service account"
}

# It needs to be an objectAdmin on the bucket to be able to
# upload new objects and erase existing objects
resource "google_storage_bucket_iam_member" "assets-admin-iam" {
  bucket = google_compute_backend_bucket.assets.bucket_name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.github_actions.email}"
}

# It needs to be a loadBalancer admin to be able 
# to invalidate Cloud CDN caches
resource "google_project_iam_member" "loadbalancer-admin-iam" {
  role   = "roles/compute.loadBalancerAdmin"
  member = "serviceAccount:${google_service_account.github_actions.email}"
}

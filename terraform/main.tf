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


resource "google_project_iam_member" "appengineiam" {
  role   = "roles/appengine.appAdmin"
  member = "serviceAccount:${google_service_account.github_actions.email}"
}
resource "google_project_iam_member" "storageiam" {
  role   = "roles/compute.storageAdmin"
  member = "serviceAccount:${google_service_account.github_actions.email}"
}
resource "google_project_iam_member" "cloudbuildiam" {
  role   = "roles/cloudbuild.builds.editor"
  member = "serviceAccount:${google_service_account.github_actions.email}"
}

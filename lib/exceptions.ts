export class AuthRequiredError extends Error {
  constructor(message = "Auth is required to access this page.") {
    super();
    this.name = "AuthRequiredError";
  }
}

export class FetchApiError extends Error {
  constructor(message = "Error fetching api.") {
    super();
    this.name = "FetchApiError";
  }
}

/**
 *  stellaria
 *  Copyright(c) 2022 Hacknock
 *  Author: Akira Kashihara <akira.kashihara@hotmail.com>
 *  MIT Licensed, The detail is on README.md and LICENSE.
 */

class GCS {
  /** GCS is an API which connects between your application and Google Cloud Platform.
   * @param {JSON} params - Setting parameter using authorization. This must include 'clientId', 'redirectUrl' and 'scope'
   */
  constructor(params) {
    if (typeof params.clientId !== "string")
      throw new Error(
        "params.clientId is invalid value. You must set String value."
      );
    this.info = params;
    this.accessToken = null;
  }

  /**
   * ### LICENSE NOTIFICATION ###
   * oauthSignIn function is origined from Google Developers page.
   * https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow?hl=en#redirecting
   * Some variable reference is changed by Akira Kashihara
   * Only this function is under Apache2.0. This licensed is issued by Google Developers.
   * Other function such as 'upload' and class such as ToolBox are under MIT license which is issued by Hacknock.
   * If you want to understand this function license, please check https://developers.google.com/terms/site-policies?hl=en
   */
  oauthSignIn = () => {
    console.log("Called oauthSignIn");
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      client_id: this.info.clientId, // This line is changed by Akira Kashihara
      redirect_uri: this.info.redirectUrl, // This line is changed by Akira Kashihara
      response_type: "token",
      scope: this.info.scope, // This line is changed by Akira Kashihara
      include_granted_scopes: "true",
      state: "pass-through value",
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  };

  /**
   * uploadFiles uploads files user selected using <input type="file" multiple>.
   * @param {Object} fileList - fileList is from <input type="file" multiple>
   * @param {string} bucketName - The bucket name you will upload file to.
   * @param {string} accessToken - The access token to access Google Cloud Storage
   * @returns {JSON} "ok" has the file list that was successfully uploaded. "ng" has the file list that was failed to upload.
   */
  uploadFiles = async (fileList, bucketName, accessToken = null) => {
    console.log("Called upload function.");
    const token = accessToken || this.accessToken;
    if (!token) throw Error("The access token is not set.");
    if (typeof fileList !== "object")
      throw Error("fileList type is invalid. It must be Object.");

    const resultJson = {};
    resultJson.ok = [];
    resultJson.ng = [];

    for (let file of fileList) {
      const reader = new FileReader();
      reader.addEventListener("load", async (event) => {
        const bytes = event.target.result;
        const response = await fetch(
          `https://storage.googleapis.com/upload/storage/v1/b/${bucketName}/o?uploadType=media&name=${file.name}`,
          {
            method: "POST",
            headers: {
              "Content-Type": file.type,
              Authorization: `Bearer ${token}`,
            },
            body: bytes,
          }
        );
        const result = await response.json();
        if (result.mediaLink) resultJson.ok.push(file.name);
        else resultJson.ng.push(file.name);
      });
      reader.readAsArrayBuffer(file);
    }
    return resultJson;
  };

  /**
   * getAccessToken gets the access token to access to Google Cloud Storage from URL string which is set to the redirect URL by Google Auth.
   * It returns the access token, and sets it to an instance variable of `GCS`.
   * @param {Object} location - 'location' is set after OAuth2.0.
   * @returns {JSON} This includes the access token to access to Google Cloud Storage. If it cannot get the access token, it includes message item.
   */
  getAccessToken = (location) => {
    if (!location.hash)
      return {
        token: null,
        message: "This location has no access token info.",
      };
    for (let value of location.hash.split("&")) {
      if (value.indexOf("access_token=") === 0) {
        const access_token = value.split("=")[1];
        this.accessToken = access_token;
        return { token: access_token };
      }
    }
    return {
      token: null,
      message: "This location has no access token info.",
    };
  };
}

export default GCS;

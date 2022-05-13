/**
 *  clam
 *  Copyright(c) 2022 Hacknock
 *  Author: Akira Kashihara <akira.kashihara@hotmail.com>
 *  MIT Licensed, The detail is on README.md and LICENSE.
 */

import GCS from "./lib/gcs.js";
import ToolKit from "./lib/toolkit.js";

("use strict");

class Clam {
  /**
   * Clam class is an entry point to your application or service.
   * @param {string} [name="GCS"] - Put "GCS" if you use Google Cloud Storage
   * @param {string} params.clientId - You get client ID from Google Cloud Platform API / Credentials.
   * @param {string} params.redirectUrl - Redirect URL. It will get autorized information from Google.
   * @param {string} params.scope - Scope is access permission level. Please refer to https://developers.google.com/identity/protocols/oauth2/scopes
   */
  constructor(name = "GCS") {
    this.name = name;
    console.log("make Clam instance mode is " + name);
    if (name === "GCS") {
      this.module = new GCS(new ToolKit());
    } else {
      throw Error(
        "The second argument is invalid. You can set only 'GCS'. It means that you use Google Cloud Storage."
      );
    }
  }

  /**
   * setCred is a method to set the credential information.
   * @param {JSON} params - Setting parameter using authorization. This must include 'clientId', 'redirectUrl' and 'scope'
   */
  setCred = (params) => {
    if (!params) throw Error("You must set the first argument.");
    if (params.clientId && params.redirectUrl && params.scope) {
      this.module.setCred(params);
    } else {
      throw Error(
        "The first argument is invalid. You must set 'clientId', 'redirectUrl' and 'scope'."
      );
    }
  };

  /**
   * This function provide auth page to each storage service.
   */
  getAuth = () => {
    console.log("Auth");
    if (!this.module) throw Error("This instance is not initialzed.");
    this.module.oauthSignIn();
  };

  /**
   * This function gets the information to access to storage service from redirect URL.
   * @returns {JSON} Return value is JSON which includes the information to access to storage service.
   */
  getAuthInfo = () => {
    console.log("Auth info + " + this.name);
    if (!this.module) throw Error("This instance is not initialzed.");
    if (this.name === "GCS") {
      return this.module.getAccessToken(location);
    }
  };

  /**
   * This function uploads files you selected to storage service.
   * @param {Object} fileList - fileList is from <input type="file" multiple>
   * @param {string} bucketName - The bucket name you will upload file to.
   * @returns {JSON} - Return JSON includes file name list of each result; success or failed.
   */
  uploadFiles = async (fileList, bucketName, callback) => {
    console.log("Uplad");
    if (!this.module) throw Error("This instance is not initialzed.");
    return this.module.uploadFiles(fileList, bucketName, callback);
  };
}

export default Clam;

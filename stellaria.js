/**
 *  stellaria
 *  Copyright(c) 2022 Hacknock
 *  Author: Akira Kashihara <akira.kashihara@hotmail.com>
 *  MIT Licensed, The detail is on README.md
 */

"use strict";

class Stellaria {
  /**
   *
   * @param {string} [name="GCS"] - Put "GCS" if you use Google Cloud Storage
   * @param {JSON} params - Setting parameter using authorization. This must include 'clientId', 'redirectUrl' and 'scope'
   * @param {string} params.clientId - You get client ID from Google Cloud Platform API / Credentials.
   * @param {string} params.redirectUrl - Redirect URL. It will get autorized information from Google.
   * @param {string} params.scope - Scope is access permission level. Please refer to https://developers.google.com/identity/protocols/oauth2/scopes
   */
  constructor(params, name = "GCS") {
    console.log("make Stellaria instance mode is " + name);
    if (!params) throw Error("You must set the first argument.");
    if (name === "GCS") {
      if (params.clientId && params.redirectUrl && params.scope) {
        this.module = new GCS(params);
      } else {
        throw Error(
          "The first argument is invalid. You must set 'clientId', 'redirectUrl' and 'scope'."
        );
      }
    } else {
      throw Error(
        "The second argument is invalid. You can set only 'GCS'. It means that you use Google Cloud Storage."
      );
    }
  }
}

class GCS {
  constructor(params) {
    console.log("make GCS instance.");
    this.info = params;
  }

  upload = async () => {
    console.log("Called upload function.");
  };

  #getAccessToken = () => {
    console.log("Called getAccessToken");
  };

  oAuthSignIn = () => {
    console.log("Called oAuthSignIn");
  };
}

class S3 {
  constructor() {
    console.log("make S3 instance.");
  }

  upload = async () => {
    console.log("Called upload function.");
  };
}

// module.exports = Stellaria;

/// <reference types="react-scripts" />

/**
 * These environment variables are embedded during the build time.
 * https://create-react-app.dev/docs/adding-custom-environment-variables/
 */ 
namespace NodeJS {
    interface ProcessEnv {
        /**
         * https://docs.mapbox.com/api/overview/#access-tokens-and-token-scopes
         */
        REACT_APP_MAPBOX_TOKEN: string;
    }
  }
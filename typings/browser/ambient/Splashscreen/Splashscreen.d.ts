// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/ac7f83bdcf1dfd70e70acf7a87cf8e83719dacd6/cordova/plugins/Splashscreen.d.ts
// Type definitions for Apache Cordova Splashscreen plugin.
// Project: https://github.com/apache/cordova-plugin-splashscreen
// Definitions by: Microsoft Open Technologies, Inc. <http://msopentech.com>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
// 
// Copyright (c) Microsoft Open Technologies, Inc.
// Licensed under the MIT license.

interface Navigator {
    /** This plugin displays and hides a splash screen during application launch. */
    splashscreen: {
        /** Dismiss the splash screen. */
        hide(): void;
        /** Displays the splash screen. */
        show(): void;
    }
}
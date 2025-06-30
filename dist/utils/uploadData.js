"use strict";
// src/utils/uploadData.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadInitialData = uploadInitialData;
// This utility script is designed to be run manually when you need to populate Firestore with initial data.
// It uses the client-side Firebase SDK.
// Ensure you have these installed:
// npm install firebase
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var auth_1 = require("firebase/auth");
var blogPosts_1 = require("../data/blogPosts");
var product_1 = require("../data/product");
// --- Firebase Configuration (for local development/manual run) ---
// IMPORTANT: In the Canvas environment, __firebase_config and __initial_auth_token are provided globally.
// For local testing outside Canvas, you might need to manually set these or your own config.
// For production Canvas deployments, these global vars will handle authentication.
var firebaseConfig = {};
var initialAuthToken = null;
console.log("Entering firebase...");
if (typeof window !== "undefined" &&
    typeof window.__firebase_config !== "undefined") {
    try {
        firebaseConfig = JSON.parse(window.__firebase_config);
    }
    catch (e) {
        console.error("Error parsing __firebase_config:", e);
    }
}
else {
    // Fallback for local testing outside Canvas (replace with your actual config if needed)
    console.warn("Using dummy Firebase config. For local testing, replace with your actual Firebase project config.");
    firebaseConfig = {
        apiKey: "AIzaSyAvxfY-M697XiIIEATiZ_W_PM_w9Ol6P3w",
        authDomain: "optimal-fragrances.firebaseapp.com",
        projectId: "optimal-fragrances",
        storageBucket: "optimal-fragrances.firebasestorage.app",
        messagingSenderId: "462977682528",
        appId: "1:462977682528:web:aca4a37ca9bc0234b58705",
        measurementId: "G-CYKVE8JKJ4",
    };
}
if (typeof window !== "undefined" &&
    typeof window.__initial_auth_token !== "undefined") {
    initialAuthToken = window.__initial_auth_token;
}
else {
    console.warn("No __initial_auth_token found. Will attempt anonymous sign-in or may fail without proper auth.");
    // For local testing, if you need authenticated writes, you'll need to set up Firebase Auth
    // and either get a custom token or allow unauthenticated writes via Security Rules (NOT RECOMMENDED for prod).
}
// Initialize Firebase App
var app;
if (!(0, app_1.getApps)().length) {
    app = (0, app_1.initializeApp)(firebaseConfig);
}
else {
    app = (0, app_1.getApp)();
}
var db = (0, firestore_1.getFirestore)(app);
var auth = (0, auth_1.getAuth)(app);
/**
 * Uploads initial product and blog post data to Firestore.
 * Requires appropriate Firebase Security Rules for write access.
 */
function uploadInitialData() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, products_1, product, productDocRef, error_1, _a, blogPosts_2, post, blogPostDocRef, error_2, authError_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Starting data upload to Firestore...");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 18, , 19]);
                    if (!initialAuthToken) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, auth_1.signInWithCustomToken)(auth, initialAuthToken)];
                case 2:
                    _b.sent();
                    console.log("Authenticated with custom token.");
                    return [3 /*break*/, 5];
                case 3: 
                // Attempt anonymous sign-in if no custom token (might fail if rules disallow)
                return [4 /*yield*/, (0, auth_1.signInAnonymously)(auth)];
                case 4:
                    // Attempt anonymous sign-in if no custom token (might fail if rules disallow)
                    _b.sent();
                    console.log("Signed in anonymously. Ensure your Firestore rules allow this or use a custom token.");
                    _b.label = 5;
                case 5:
                    // --- Upload Products ---
                    console.log("Uploading products to 'products' collection...");
                    _i = 0, products_1 = product_1.products;
                    _b.label = 6;
                case 6:
                    if (!(_i < products_1.length)) return [3 /*break*/, 11];
                    product = products_1[_i];
                    _b.label = 7;
                case 7:
                    _b.trys.push([7, 9, , 10]);
                    productDocRef = (0, firestore_1.doc)(db, "products", product.id);
                    return [4 /*yield*/, (0, firestore_1.setDoc)(productDocRef, __assign(__assign({}, product), { createdAt: (0, firestore_1.serverTimestamp)(), updatedAt: (0, firestore_1.serverTimestamp)() }))];
                case 8:
                    _b.sent();
                    console.log("\u2705 Uploaded product: ".concat(product.name, " (ID: ").concat(product.id, ")"));
                    return [3 /*break*/, 10];
                case 9:
                    error_1 = _b.sent();
                    console.error("\u274C Failed to upload product ".concat(product.name, " (ID: ").concat(product.id, "):"), error_1);
                    return [3 /*break*/, 10];
                case 10:
                    _i++;
                    return [3 /*break*/, 6];
                case 11:
                    console.log("Products upload complete.");
                    // --- Upload Blog Posts ---
                    console.log("Uploading blog posts to 'blogPosts' collection...");
                    _a = 0, blogPosts_2 = blogPosts_1.blogPosts;
                    _b.label = 12;
                case 12:
                    if (!(_a < blogPosts_2.length)) return [3 /*break*/, 17];
                    post = blogPosts_2[_a];
                    _b.label = 13;
                case 13:
                    _b.trys.push([13, 15, , 16]);
                    blogPostDocRef = (0, firestore_1.doc)(db, "blogPosts", post.id);
                    return [4 /*yield*/, (0, firestore_1.setDoc)(blogPostDocRef, __assign(__assign({}, post), { createdAt: (0, firestore_1.serverTimestamp)(), updatedAt: (0, firestore_1.serverTimestamp)() }))];
                case 14:
                    _b.sent();
                    console.log("\u2705 Uploaded blog post: ".concat(post.title, " (ID: ").concat(post.id, ")"));
                    return [3 /*break*/, 16];
                case 15:
                    error_2 = _b.sent();
                    console.error("\u274C Failed to upload blog post ".concat(post.title, " (ID: ").concat(post.id, "):"), error_2);
                    return [3 /*break*/, 16];
                case 16:
                    _a++;
                    return [3 /*break*/, 12];
                case 17:
                    console.log("Blog posts upload complete.");
                    return [3 /*break*/, 19];
                case 18:
                    authError_1 = _b.sent();
                    console.error("Authentication failed, cannot upload data:", authError_1);
                    return [3 /*break*/, 19];
                case 19:
                    console.log("Initial data upload process finished.");
                    return [2 /*return*/];
            }
        });
    });
}
// --- CALL THE UPLOAD FUNCTION HERE ---
// This is the missing piece!
uploadInitialData().catch(console.error); // Call the function and catch any top-level errors
// The window.uploadInitialData export below is for browser environments (like the temporary page)
// and is not needed for direct Node.js execution.
// window.uploadInitialData = uploadInitialData;
// You can expose this function globally for easy access in the browser console during development
// For example, in a development build or if this script is included directly in an HTML page.
// window.uploadInitialData = uploadInitialData;
// For production, you'd typically remove this or guard it securely.

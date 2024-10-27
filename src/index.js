import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import 'semantic-ui-css/semantic.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>Fresh & Exotic Catering Calculator | Plan Your Catering Packages with Ease</title>
        <meta property="title" content="Fresh & Exotic Catering Calculator | Plan Your Catering Packages with Ease" />
        <meta property="og:title" content="Fresh & Exotic Catering Calculator | Plan Your Catering Packages with Ease" />
        <meta property="description" content="Use Fresh & Exotic's Catering Calculator to customize your perfect catering package with ease. Plan for your events with personalized menu options, flexible pricing, and detailed cost estimates." />
        <meta property="og:description" content="Use Fresh & Exotic's Catering Calculator to customize your perfect catering package with ease. Plan for your events with personalized menu options, flexible pricing, and detailed cost estimates." />
        {/* <meta property="og:image" content="https://yourwebsite.com/path/to/preview-image.jpg" /> */}
        <meta property="url" content="https://catering.freshandexotic.com" />
        <meta property="og:url" content="https://catering.freshandexotic.com" />
        <meta property="type" content="website" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://yourwebsite.com/catering-calculator"/>
        {/* <link rel="apple-touch-icon" sizes="57x57" href="assets/apple-icon-57x57.png"/>
        <link rel="apple-touch-icon" sizes="60x60" href="assets/apple-icon-60x60.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="assets/apple-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="assets/apple-icon-76x76.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="assets/apple-icon-114x114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="assets/apple-icon-120x120.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="assets/apple-icon-144x144.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="assets/apple-icon-152x152.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192"  href="assets/android-icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="assets/favicon-96x96.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png"/> */}
        <link rel="manifest" href="assets/manifest.json"/>
        {/* <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
        <meta name="theme-color" content="#ffffff"/> */}
      </Helmet>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

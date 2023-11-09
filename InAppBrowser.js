import React from 'react';
import { WebView } from 'react-native-webview';

const InAppBrowser = ({ url }) => {
  return <WebView source={{ uri: url }} />;
};

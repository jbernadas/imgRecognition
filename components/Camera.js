import React from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CaptureButton from './CaptureButton';

export default class Camera extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      indentifiedAs: '',
      loading: false
    }
  }

  takePicture = async function() {
    // Pause the camera's preview
    this.camera.pausePreview();

    // Set the activity indicator
  }
}
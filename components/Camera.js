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
    this.setState((previousState, props) => ({
      loading: true
    }));

    // Set options
    const options = {
      base64: true
    };

    // Get the base64 version of the image
    const data = await this.camera.takePictureAsync(options)

    // Get the identified image
    this.indentifyImage(data.base64);

  }


  identifyImage(imageData){
    // Initialize Clarifai api
    const Clarifai = require('clarifai')
    const app = new Clarifai.App({
      apiKey: '7b7a789aa2984f6d8c93b768c07e88af'
    });

    // Identify the image
    app.models.predict(Clarifai.GENERAL_MODEL, {base64: imageData})
      .then((response) => this.displayAnswer(response.outputs[0].data.concepts[0].name)
      .catch((err) => alert(err))
    );
  }

  displayAnswer(indentifiedImage){
    // Dismiss the activity indicator
    this.setState((prevState, props) => ({
      identifiedAs: identifiedImage,
      loading: false
    }));

    // Show an alert with the answer
    Alert.alert(
      this.state.identifiedAs,
      '',
      { cancelable: false }
    )

    // Resume the preview
    this.camera.resumePreview();
  }

  render() {
    return(
      <RNCamera ref={ref => {this.camera = ref;}} style={StyleSheet.preview}>
        <ActivityIndicator size="large" style={StyleSheet.loadingIndicator} color="#ffffff" animating={this.state.loading}/>
        <CaptureButton buttonDisabled={this.state.loading} onClick={this.takePicture.bind(this)}/>
      </RNCamera>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },

  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

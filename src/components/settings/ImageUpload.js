import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import app from '../../base';
import { Context } from '../../context'


export default class ImageUpload extends Component {

  onDrop = picture => {
		// Create a Storage Ref w/ username
		var storageRef = app.storage().ref(this.context.state.user_id + '/profilePicture/profilepic.jpg');
		// Upload file
		var task = storageRef.put(picture[0])
			.then(e => {
				this.context.state.getImageFromStorage();
				this.props.hideUploadButton();
			})

		this.context.getUser()
  }

	render = _ =>
		<div>
	    <ImageUploader
	        withIcon={true}
	        buttonText="Upload Picture"
	        onChange={this.onDrop.bind(this)}
	        imgExtension={['.jpg', '.gif', '.png', '.gif']}
	        maxFileSize={5242880}
	    />
		</div>
}
ImageUpload.contextType = Context


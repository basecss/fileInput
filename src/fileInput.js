'use strict'

var React = require('react')

module.exports = React.createClass({

	getDefaultProps: function () {
		return {
			multiple: true,
			btnValue: 'Upload Image',
			className: 'upload-button'
		}
	},

	propTypes: {
		onChange: React.PropTypes.func.isRequired,
		multiple: React.PropTypes.bool,
		btnValue: React.PropTypes.string
	},

	_onChange: function (event) {
		event.preventDefault()
		var target = event.target
		var files = target.files
		var count = this.props.multiple ? files.length : 1
		var i
		for (i = 0; i < count; i++) {
			files[i].thumb = URL.createObjectURL(files[i])
		}
		// convert to array
		files = Array.prototype.slice.call(files, 0)
		files = files.filter(function (file) {
			return /image/i.test(file.type)
		})
		this.props.onChange(files, event)
	},

	render: function () {
		var className = this.props.className
		return (
			<a href="javascript:;" className={className}>
				<input type="file" multiple={this.props.multiple} ref="fileInput" onChange={this._onChange} />
				<span>{this.props.btnValue}</span>
			</a>
		)
	}

})
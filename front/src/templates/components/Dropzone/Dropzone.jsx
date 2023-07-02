import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

// Style
import "./dropzone.css";

const thumb = {
	display: "inline-flex",
	borderRadius: 2,
	border: "1px solid #eaeaea",
	marginBottom: 8,
	marginRight: 8,
	width: 100,
	height: 100,
	padding: 4,
	boxSizing: "border-box",
};

const thumbInner = {
	display: "flex",
	minWidth: 0,
	overflow: "hidden",
};

const img = {
	display: "block",
	width: "auto",
	height: "100%",
};

const Dropzone = ({ setFilesUploaded}) => {
	const [files, setFiles] = useState([]);
	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			maxFiles: 16,
			accept: "image/jpeg,image/png, .jpeg,.png",
			multiple: true,
			onDrop: (acceptedFiles) => {
				setFiles(
					acceptedFiles.map((file) =>
						Object.assign(file, {
							preview: URL.createObjectURL(file),
						})
					)
				);
			},
		});

	const thumbs = files.map((file) => {
		return (
			<div style={thumb} key={file.name}>
				<div style={thumbInner}>
					<img src={file.preview} style={img} />
				</div>
			</div>
		);
	});

	useEffect(() => {
		setFilesUploaded([]);
		// Make sure to revoke the data uris to avoid memory leaks
		files.forEach((file) => {
			return URL.revokeObjectURL(file.preview);
		});
		setFilesUploaded(files);
	}, [files]);

	const acceptedFileItems = acceptedFiles.map((file) => (
		<li key={file.path}>
			{file.path} - {(file.size / 1000).toFixed(2)} Kbs
		</li>
	));

	const fileRejectionItems = fileRejections.map(({ file, errors }) => {
		return (
			<li key={file.path}>
				{file.path} - {file.size / 1000} Kb
				<ul>
					{errors.map((e) => (
						<li key={e.code}>{e.message}</li>
					))}
				</ul>
			</li>
		);
	});

	return (
		<section className="container col-span-1 sm:col-span-2 md:col-span-4">
			<div className="border-2 p-2">
				<div
					{...getRootProps({
						className:
							"dropzone bg-gray-100 py-16 font-bold border-dashed border-2 border-gray-300 text-center",
					})}
				>
					<input {...getInputProps({ id: "file-upload-input" })} />
					<p className="text-xl text-center text-gray-400">
						Drag 'n' drop at least 3 files here, or click to select
						files
					</p>
					<em className="text-gray-400 text-center">
						(16 files are the maximum number of files you can drop
						here - Only *.jpeg and *.png images will be accepted)
					</em>
				</div>
			</div>

			<aside className="mt-4 text-left">
				{thumbs}
				{!!acceptedFileItems.length && (
					<>
						<label className="inputLabel">Accepted files</label>
						<ul>{acceptedFileItems}</ul>
					</>
				)}
				{!!(<ul>{fileRejectionItems}</ul>).length && (
					<>
						<label className="inputLabel mt-3">
							Rejected files
						</label>
						<ul>{fileRejectionItems}</ul>
					</>
				)}
			</aside>
		</section>
	);
};

export default Dropzone;

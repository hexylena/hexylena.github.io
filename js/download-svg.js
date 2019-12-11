function bindDownloadButton(buttonId, plotId){
	var downloadThisSvg = document.getElementById(plotId);

	document.getElementById(buttonId).addEventListener("click", function(evt){
		var svgData = downloadThisSvg.outerHTML;
		var preface = '<?xml version="1.0" standalone="no"?>\r\n';
		var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
		var svgUrl = URL.createObjectURL(svgBlob);
		var downloadLink = document.createElement("a");
		downloadLink.href = svgUrl;
		downloadLink.download = "output.svg";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	})
}

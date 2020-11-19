//import * as electron from "electron";
var dialog = require('electron').remote.dialog;
var utils = require('./dist/utils');
var CreateTree = require('./dist/filesystemEntities/createTree');
function openCatalog() {
    var pathText = document.getElementById("pathText");
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(function (result) {
        pathText.innerText = result.filePaths[0];
        //console.log(getDirAndFiles(result.filePaths[0],undefined,undefined,"dirs"))
        //console.log(getDirAndFiles(result.filePaths[0],undefined,undefined,"files"))
        var selectedOption = '' + document.getElementById("selectMethod").selectedIndex; //.selectedIndex;
        if (selectedOption == '0')
            selectedOption = 'tree';
        else if (selectedOption == '1')
            selectedOption = 'json';
        var dirContentAsString = new CreateTree().getDirContentAsString(result.filePaths[0], selectedOption);
        createDirectoryTree(dirContentAsString);
    })["catch"](function (err) {
        console.log(err);
    });
}
function setNewSceneForTree(treeContent) {
    document.getElementById("getContainer").style.display = "none";
    document.getElementById("pathContainer").style.display = "none";
    document.getElementById("TreeContainer").style.display = "block";
    document.getElementById("TreeArea").innerText = treeContent;
}
function createDirectoryTree(treeContent) {
    setNewSceneForTree(treeContent);
}
function returnToMenu() {
    window.location.href = "index.html";
}
//# sourceMappingURL=openDirectory.js.map
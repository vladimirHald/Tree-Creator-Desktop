//import * as electron from "electron";
//import {createTree} from './filesystemEntities/createTree'
var dialog = require('electron').remote.dialog;
var createTree = require('./dist/filesystemEntities/createTree').createTree;
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
        else if (selectedOption == '2')
            selectedOption = 'listTree';
        var dirContentAsString = new createTree().getDirContentAsString(result.filePaths[0], selectedOption);
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
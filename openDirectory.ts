//import * as electron from "electron";



//import {createTree} from './filesystemEntities/createTree'
const dialog = require('electron').remote.dialog;
const createTree = require('./dist/filesystemEntities/createTree').createTree


function openCatalog() {
  var pathText = document.getElementById("pathText");
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then((result: any) => {
    pathText.innerText = result.filePaths[0]

    //console.log(getDirAndFiles(result.filePaths[0],undefined,undefined,"dirs"))
    //console.log(getDirAndFiles(result.filePaths[0],undefined,undefined,"files"))
    let selectedOption = '' + (document.getElementById("selectMethod") as HTMLFormElement).selectedIndex;//.selectedIndex;
    if(selectedOption == '0')
    selectedOption = 'tree'
    else if(selectedOption == '1')
    selectedOption = 'json'
    else if(selectedOption == '2')
    selectedOption = 'listTree'
    let dirContentAsString = new createTree().getDirContentAsString(result.filePaths[0], selectedOption);
    createDirectoryTree(dirContentAsString);
  }).catch((err: any) => {
    console.log(err)
  })
}





function setNewSceneForTree(treeContent: any) {
  document.getElementById("getContainer").style.display = "none";
  document.getElementById("pathContainer").style.display = "none";
  document.getElementById("TreeContainer").style.display = "block";
  document.getElementById("TreeArea").innerText = treeContent;
}

function createDirectoryTree(treeContent: any) {
  setNewSceneForTree(treeContent);
}

function returnToMenu() {
  window.location.href = "index.html"
}
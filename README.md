# Tree Creator Desktop
Create Project Structure with Tree Creator Desktop

## How to develop application

### On Windows

1. [Download and install Node.js](https://nodejs.org/), latest LTS version
2. Install git: [console client](https://git-scm.com/downloads) or [any GUI client](https://git-scm.com/download/gui/windows)
2. In the pre-project path, run
```
# In case of console client:
git clone https://github.com/PersikMirkotov/Tree-Creator-Desktop.git Tree-Creator-Desktop 
# Otherwise clone project via GUI client

cd Tree-Creator-Desktop
npm install
npm start
```

## How to build application

### For Windows

Run in project's dir
```
npm install electron-packager -g
electron-packager . Tree-Creator-Desktop --platform=win32 --arch=x64
```

Go to `./Tree-Creator-Desktop-win32-x64` and run `Tree-Creator-Desktop.exe`.
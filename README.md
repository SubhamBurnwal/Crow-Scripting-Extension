# CROW                  

Crow is a short script/browser extension that allows you to inject other scripts into browser tabs and save them for later use. I made this for me for not bypassing paywalls for some sites, if you know what I mean. Its not much but I am uploading it for posterity.

#### Browser Permissions
+ activeTab
+ scripting
+ storage

#### ToDo
This is not meant to be your go-to automation tool, try Selenium, etc for that.
I will be adding ability to import from repositories and other sources for my needs, but once again, its not meant to be a full-fletched automation tool. 


## Installation

**If you just want to use this extension,**
1. Download the latest bundle (.crx) from [here](https://github.com/SubhamBurnwal/Crow-Scripting-Extension/tree/master/bundles).
2. Drag it over your browser window and confirm installation.

For Firefox, you can download it from here:

Alternatively, if you want to debug and extend the code:

1. Clone this repository:

    bash: `git clone https://github.com/your-username/crow-extension.git`
2. Open your Chromium browser and go to [chrome://extensions/](chrome://extensions/).
3. Enable "Developer mode" in the top-right corner.
4. Click "Load unpacked" and select the folder containing the cloned repository. 

Crow extension will be added to your browser as "crow-debug". 
This extension uses the manifest.json in the repository root. If you make any changes to this file that should apply to the build, you will may need to copy it manually

## Epilogue
<pre>
Contributions are welcome! This project is copy-lefted. Please search up the term yourself.






























And for those who scrolled down this much, heres a borrowed ascii art cause I am bad at it:

 
                             ▒▒▒▒▒▒▒▒▒▒▒░   ▓█▒ ▒▒█▓    
                            ░   ░      ░░░▒▒▒▓▒░░▒      
                    ▒▒▒▒░░░░   ░░  ░          ▓▒░       
                   ▒░░░░ ▒▒▒▒▒▒▒░  ░ ░░  ░  ░  ▓▒░       
                  ▓▒▒▒▒▒░▓▓▓▓▓▓▓░      ░  ░  ░░ ▓▒░▒      
                                ▒   ░   ░  ░░  ░ ▓▒░▒   
                                ▒   ░  ░  ░░  ░   ░▓▒░ 
                                ▒ ░░░░░░░░░   ░  ░ ░▓▒░
                                ░░▒▒▒▒▒▒▒▒▒░░░  ░  ░ ▓▒ 
                                ▒░░░░░░░░░░░▒░░   ░  ░▒ 
                              █▓▒▒  ░░░░░░░░░░▒░  ░   ▒ 
                            █▓▒░░░▒▒  ░░░░░░░░░▒░  ░░ ▒ 
                          █▓▒░░░░░░░▒▒  ░░░░░░░▒░    ░▒ 
                        █▓▒░░░░░░░░░░░▒▒ ░░░░░░▒░ ░ ░▒  
                      █▓▒░░░░░░░░░░░░░░░▒ ░░░░░   ░░▒   
                    ▒█▓▒░░░░░░░░░░░░░░░▒▒▓░░░░▒░░ ░▒    
                   ▓▒░  ▒▒▒▒▒▒░░░░▒▒▒▒▒   ░░▒░░  ░▒     
                 ▓▒░░▒▒░░     ▒▒▒░     ░░▒▒░░  ░░▒      
               ▒░░▓▒█░░░▒▒▒▒▒▒░░░░▒▒▒▒▒▒░░░  ░░▒        
             ▒░░▓▓█░    ░░░░░░░  ░░░░░░░  ░░▒▒          
           ▒░░▓▓█░  ░                 ░░▒▒▒             
         ▒░░▓▓█░  ░  ░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒                 
        ▒░▓▓█░░░░ ░  ░░▒                                
      ▒░░▓█░░▒  ▒▒▒▒▒▒                                  
    ▒▒░▓█░░▒
    
</pre>

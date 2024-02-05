// import './index.css';
let runBtn, quickRunBtn, saveBtn, loadBtn, purgeBtn, scriptSelect, scriptInput, nameInput;

document.onreadystatechange = ()=>{
  document.getElementById("app").innerHTML = 
    `<div class="container">`+
      `<h3>Lazy Editor:</h3>`+
      `<textarea id="scriptInput" placeholder="Type or Paste here"></textarea>`+
      `<div class="row">`+
        `<button id="runBtn">Run</button>`+
        `<button id="saveBtn">Save</button>`+
      `</div>`+
      `<input id="nameInput" placeholder="Enter script name">`+
      `<div class="row">`+
        `<button id="loadBtn">Load</button>`+
        `<button id="purgeBtn">Purge</button>`+
      `</div>`+
      `<div class="row">`+
        `<select id="scriptSelect"><option value="-1">Select script</option></select>`+
        `<button id="quickRunBtn">ᚱ</button>`+
      `</div>`+
    `</div>`;

  runBtn = document.getElementById("runBtn");
  quickRunBtn = document.getElementById("quickRunBtn");
  saveBtn = document.getElementById("saveBtn");
  loadBtn = document.getElementById("loadBtn");
  purgeBtn = document.getElementById("purgeBtn");
  scriptSelect = document.getElementById("scriptSelect");
  scriptInput = document.getElementById("scriptInput");
  nameInput = document.getElementById("nameInput");
  
  runBtn.onclick=runScript;
  quickRunBtn.onclick=quickRunScript;
  saveBtn.onclick=saveScript;
  loadBtn.onclick=loadScript;
  purgeBtn.onclick=purgeScript;
  
  populateSelector();
  
  nameInput.onchange = e=>populateSelector(e.target.value.trim());
};

// ----------------------------------------------

// Fetch saved scripts and populate the select dropdown
function populateSelector(keyword=null){
  chrome.storage.sync.get({ scripts: [] }, function(data) {
    scriptSelect.innerHTML = "<option value='-1'>Select script</option>";
    
    const scripts = data.scripts;
    
    let options = [];
    if(keyword){
      options = scripts.filter(script=>script.name.match(keyword));
    } else {
      options = scripts;
    }

    options.forEach(function(script, index) {
      const option = document.createElement("option");
      option.value = script.code;
      option.text = script.name;
      scriptSelect.add(option);
    });
  });
}

// Save a new script
function saveScript() {
  
  const script = scriptInput.value.trim();
  const name = nameInput.value.trim();
  if (script !== "" && name !== "") {
    saveBtn.onclick=()=>{};
    const namedScript = { name: name, code: script };
    chrome.runtime.sendMessage({ action: "saveScript", script: namedScript });
    // scriptInput.value = "";
    // nameInput.value = "";
    setTimeout(()=>{
      populateSelector(name);
      saveBtn.onclick=saveScript;
    },500)
  }
}

// Save a new script with a given name
function loadScript() {
  loadBtn.onclick=()=>{};
  
  scriptInput.value = scriptSelect.value;
  nameInput.value = scriptSelect.selectedOptions[0].text;
  setTimeout(()=>{
    loadBtn.onclick=loadScript;
  },500)
}

// Run the selected script
function runScript() {
  runBtn.onclick=()=>{};
    
  if (scriptInput.value != "") {
    chrome.runtime.sendMessage({ action: "runScript", code: scriptInput.value });
  }
  setTimeout(()=>{
    runBtn.onclick=runScript;
  },500)
}

// Run the selected script
function quickRunScript() {
  quickRunBtn.onclick=()=>{};
  
  const selectedIndex = scriptSelect.options.selectedIndex;
  
  if (selectedIndex != 0) {
    const selectedScript = scriptSelect.selectedOptions[0].value;
    chrome.runtime.sendMessage({ action: "runScript", code: selectedScript });
  }
  setTimeout(()=>{
    quickRunBtn.onclick=runScript;
  },500)
}

function purgeScript() {
  const selectedIndex = scriptSelect.options.selectedIndex; 
  
  if (selectedIndex != 0) {
    purgeBtn.onclick=()=>{};
    const selectedScript = scriptSelect.selectedOptions[0].text;
    chrome.runtime.sendMessage({ action: "purgeScript", name: selectedScript });
    scriptSelect.selectedIndex = 0;
    setTimeout(()=>{
      purgeBtn.onclick=purgeScript;
      populateSelector();
    },500)
  }
  
}

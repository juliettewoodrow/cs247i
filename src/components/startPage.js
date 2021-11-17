import { useEffect } from "react";
import { io } from "socket.io-client";
import * as constants from '../util/constants.js';

function StartPage({callback}) {
  useEffect(()=>{
    let name = null;
      while (!name) name = prompt("Enter your name:");
      let nameLabel = document.querySelector("#nameLabel")
      if (nameLabel){
        nameLabel.textContent = name;
      }
      
      let socket = io();
      socket.emit("join", { name });
      let chatform = document.querySelector("#chatform")
      if (chatform) {
        chatform.addEventListener("submit", (event) => {
          event.preventDefault();
          let input = document.querySelector("#message");
          socket.emit("message", { text: input.value });
          input.value = "";
        });
      }

      socket.on("message", message => {
        let elem = document.createElement("div");
        if (message.name) {
          let label = document.createElement("strong");
          label.textContent = `${message.name}:`;
          elem.appendChild(label);
        }
        let text = document.createElement("span");
        text.textContent = message.text;
        elem.appendChild(text);
        let chatarea = document.querySelector("#chatarea");
        if (chatarea){
          chatarea.appendChild(elem);
        } else {
          alert (message.text);
        }
      });
      window.onbeforeunload = () => {
        socket.emit("disconnect", { name });
      }
  },[]);

  let onStartButtonClickCallback = () => {
    callback(constants.PLAY_STATE);
  }

  return (
    <div>
      <button onClick={onStartButtonClickCallback}>
        Start Game!
      </button>
    </div>
  );
};

export default StartPage;

#pragma strict

class NPCScript extends MonoBehaviour {

	static var NPCcount : int = 0;

	var currentState : int = 0;
	var playerData : Hashtable;
	var cha : int = 10;
	var score : int;
	var buffer : int;
	var movDirection : int;
	var device : UnityEngine.DeviceType;
	
	var hasDelayed : boolean;
	var hasSetCha : boolean;
	
	var posX : int;
	var posY : int;
	var hatesPlayer : boolean;
	var lovesPlayer : boolean;
	
	var npcType : String;
	
	var lastPlayerPosition : Vector3;
	var lastPlayerRange : int;
	var avoidanceRange : int;
	var playerObj : GameObject;
	var playerCha : int;
	var animationScript : Animator;
	var personSpeechObj :  PersonSpeech;
	var hasHugged : boolean = false;
	
	var u : boolean;
	var l : boolean;
	var d : boolean;
	var r : boolean;

	// Markov Model for NPC Movement Probabilities
	var MOVE_STATE_PROBABILITY : float = 0.60; // 50 % chance to keep moving
	var STAY_STATE_PROBABILITY : float = 0.80; // 80 % to stay in current location
	var STATE_MOVING : int = 0;
	var STATE_STOPPED : int = 1;
	var Timer : float = 0.0;
	function Update(){
		NullShit();
		if (!hasSetCha) {
			SetType();
			SetChaAndScore();
			UpdateCha();
			hasSetCha = true;
		}
		Move();
	}
	
	function SetType() {
		playerCha = playerObj.GetComponent(PlayerScript).cha;
		switch(playerCha) {
			case 0:
				if(NPCScript.NPCcount < 1 ){
					this.npcType = "hobo";
				}
				else if( NPCScript.NPCcount < 2 ){
					this.npcType = "lower";
				}
				else if( NPCScript.NPCcount < 4 ){
					this.npcType = "middle";
				}
				else if( NPCScript.NPCcount < 6 ){
					this.npcType = "upper";
				}
				else if( NPCScript.NPCcount < 10 ){
					this.npcType = "celebrity";
				}
				NPCScript.NPCcount++;
			break;
			case 1:
				if(NPCScript.NPCcount < 1 ){
					this.npcType = "hobo";
				}
				else if( NPCScript.NPCcount < 3 ){
					this.npcType = "lower";
				}
				else if( NPCScript.NPCcount < 4 ){
					this.npcType = "middle";
				}
				else if( NPCScript.NPCcount < 6 ){
					this.npcType = "upper";
				}
				else if( NPCScript.NPCcount < 10 ){
					this.npcType = "celebrity";
				}
				NPCScript.NPCcount++;
			break;
			case 2:
				if(NPCScript.NPCcount < 1 ){
					this.npcType = "hobo";
				}
				else if( NPCScript.NPCcount < 3 ){
					this.npcType = "lower";
				}
				else if( NPCScript.NPCcount < 5 ){
					this.npcType = "middle";
				}
				else if( NPCScript.NPCcount < 7 ){
					this.npcType = "upper";
				}
				else if( NPCScript.NPCcount < 10 ){
					this.npcType = "celebrity";
				}
				NPCScript.NPCcount++;
			break;
			case 3:
				if(NPCScript.NPCcount < 2 ){
					this.npcType = "hobo";
				}
				else if( NPCScript.NPCcount < 3 ){
					this.npcType = "lower";
				}
				else if( NPCScript.NPCcount < 6 ){
					this.npcType = "middle";
				}
				else if( NPCScript.NPCcount < 7 ){
					this.npcType = "upper";
				}
				else if( NPCScript.NPCcount < 10 ){
					this.npcType = "celebrity";
				}
				NPCScript.NPCcount++;
			break;
			case 4:
				if(NPCScript.NPCcount < 2 ){
					this.npcType = "hobo";
				}
				else if( NPCScript.NPCcount < 4 ){
					this.npcType = "lower";
				}
				else if( NPCScript.NPCcount < 6 ){
					this.npcType = "middle";
				}
				else if( NPCScript.NPCcount < 8 ){
					this.npcType = "upper";
				}
				else if( NPCScript.NPCcount < 10 ){
					this.npcType = "celebrity";
				}
				NPCScript.NPCcount++;
			break;
			case 5:
				if(NPCScript.NPCcount < 2 ){
					this.npcType = "hobo";
				}
				else if( NPCScript.NPCcount < 5 ){
					this.npcType = "lower";
				}
				else if( NPCScript.NPCcount < 8 ){
					this.npcType = "middle";
				}
				else if( NPCScript.NPCcount < 9 ){
					this.npcType = "upper";
				}
				else if( NPCScript.NPCcount < 10 ){
					this.npcType = "celebrity";
				}
				NPCScript.NPCcount++;
			break;
			case 6:
				if(NPCScript.NPCcount < 2 ){
					this.npcType = "hobo";
				}
				else if( NPCScript.NPCcount < 6 ){
					this.npcType = "lower";
				}
				else if( NPCScript.NPCcount < 8 ){
					this.npcType = "middle";
				}
				else if( NPCScript.NPCcount < 9 ){
					this.npcType = "upper";
				}
				else if( NPCScript.NPCcount < 25 ){
					this.npcType = "celebrity";
				}
				NPCScript.NPCcount++;
			break;
			case 7:
				if(NPCScript.NPCcount < 3 ){
					this.npcType = "hobo";
				}
				else if( NPCScript.NPCcount < 6 ){
					this.npcType = "lower";
				}
				else if( NPCScript.NPCcount < 8 ){
					this.npcType = "middle";
				}
				else if( NPCScript.NPCcount < 9 ){
					this.npcType = "upper";
				}
				else if( NPCScript.NPCcount < 10 ){
					this.npcType = "celebrity";
				}
				NPCScript.NPCcount++;
			break;
			case 8:
				if(NPCScript.NPCcount < 4 ){
					this.npcType = "hobo";
				}
				else if( NPCScript.NPCcount < 6 ){
					this.npcType = "lower";
				}
				else if( NPCScript.NPCcount < 8 ){
					this.npcType = "middle";
				}
				else if( NPCScript.NPCcount < 9 ){
					this.npcType = "upper";
				}
				else if( NPCScript.NPCcount < 10 ){
					this.npcType = "celebrity";
				}
				NPCScript.NPCcount++;
			break;
			case 9:
				if(NPCScript.NPCcount < 5 ){
					this.npcType = "hobo";
				}
				else if( NPCScript.NPCcount < 7 ){
					this.npcType = "lower";
				}
				else if( NPCScript.NPCcount < 8 ){
					this.npcType = "middle";
				}
				else if( NPCScript.NPCcount < 9 ){
					this.npcType = "upper";
				}
				else if( NPCScript.NPCcount < 10 ){
					this.npcType = "celebrity";
				}
				NPCScript.NPCcount++;
			break;
			case 10:
				if(NPCScript.NPCcount < 6 ){
					this.npcType = "hobo";
				}
				else if( NPCScript.NPCcount < 7 ){
					this.npcType = "lower";
				}
				else if( NPCScript.NPCcount < 8 ){
					this.npcType = "middle";
				}
				else if( NPCScript.NPCcount < 9 ){
					this.npcType = "upper";
				}
				else if( NPCScript.NPCcount < 10 ){
					this.npcType = "celebrity";
				}
				NPCScript.NPCcount++;
			break;
			
		}
	}
	
	function SetChaAndScore() {
		switch (npcType) {
		case null:
			cha = 0;
			score = 0;
			break;
		case "hobo":
			cha = 0;
			score = 10;
			break;
		case "lower":
			cha = 2;
			score = 20;
			break;
		case "middle":
			cha = 4;
			score = 50;
			break;
		case "upper":
			cha = 6;
			score = 100;
			break;
		case "celebrity":
			cha = 8;
			score = 200;
			break;
		}
	}
	
	function UpdateCha(){
		if( playerCha - this.cha > 2 ){
			lovesPlayer = true;
			hatesPlayer = false;
		}

		else if( playerCha - this.cha < -2 ){
			lovesPlayer = false;
			hatesPlayer = true;
		}
	}
	
	function NullShit() {
		if (playerObj == null) {
			playerObj = GameObject.FindWithTag("Player");
		}
	}
	
	function HatesPlayer(){
		return hatesPlayer;
	}
	
	
	function LovesPlayer(){
		return lovesPlayer;
	}
	

	function Move() {
		if (!hasDelayed) {
			Timer -= Random.Range(0.00,2.00);
			hasDelayed = true;
		}
	 	Timer += Time.deltaTime;
	 	System.Console.Write(Timer.ToString());
		if (Timer > 3){
			if( currentState == STATE_MOVING && Random.value <=  MOVE_STATE_PROBABILITY ){
				this.currentState = STATE_MOVING;
			}
			else if( currentState == STATE_MOVING && Random.value >  MOVE_STATE_PROBABILITY ){
				this.currentState = STATE_STOPPED;
			}

			// If we're stopping, we should stay stopped for a while
			if( currentState == STATE_STOPPED && Random.value <=  STAY_STATE_PROBABILITY ){
				this.currentState = STATE_STOPPED;
			}
			else if ( currentState == STATE_STOPPED && Random.value > STAY_STATE_PROBABILITY ){
				this.currentState = STATE_MOVING;
			}
			Timer = 0;
			if (currentState == STATE_MOVING) { 
				this.currentState = STATE_MOVING;
				CalMovement();
			}
			if (CloseToPlayer() && HatesPlayer()) { 
				this.currentState = STATE_MOVING;
				GetAway();
			}
			else if(CloseToPlayer() && LovesPlayer()){
				this.currentState = STATE_MOVING;
				GetCloser();
			}
			
			
		} else {
			if( this.currentState == STATE_MOVING ){		
				switch (movDirection) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 6:
					case 7:
					case 8:
					case 9:
						transform.Translate(new Vector3( 0, Time.deltaTime, 0));
						animationScript.SetBool("Idle",false);
						if (!animationScript.GetCurrentAnimatorStateInfo(0).IsName("Hug")) {
							animationScript.SetTrigger("Walking");
						}
						break;
					case 0:
						if (CloseToPlayer() && HatesPlayer()) { 
							GetAway();
						}
						else if(CloseToPlayer() && LovesPlayer()){
							GetCloser();
						}
						animationScript.SetBool("Idle",true);
						break;
				}
			
			} else {
				if (CloseToPlayer() && HatesPlayer()) { 
					GetAway();
				}
				else if(CloseToPlayer() && LovesPlayer()){
					GetCloser();
				}
			}
		}
	}
	
	function CloseToPlayer() : boolean {
		lastPlayerPosition = playerObj.transform.position;
		return Vector3.Distance (lastPlayerPosition, transform.position ) < avoidanceRange;
	}
	
	function CheckDistance(){
		if( Vector3.Distance (lastPlayerPosition, transform.position ) < avoidanceRange){
			this.currentState = STATE_MOVING;

			// we need to run away if we're getting closer
			if( lastPlayerRange < Vector3.Distance (lastPlayerPosition, transform.position ) ){
									
			}
			lastPlayerRange = Vector3.Distance ( lastPlayerPosition, transform.position );
		}
	
		lastPlayerPosition = playerObj.transform.position;
	}
	
	function GetAway() {
		if(!hasHugged){
			personSpeechObj.playVoice(1, "Reject");
		}

		this.movDirection = GetAwayAngle(playerObj.transform.position.x - transform.position.x, playerObj.transform.position.y - transform.position.y);
		switch (movDirection) {
				case 1:
					transform.localEulerAngles = new Vector3(0,0,45);
					break;
				case 2:
					transform.localEulerAngles = new Vector3(0,0,0);
					break;
				case 3:
					transform.localEulerAngles = new Vector3(0,0,-45);
					break;
				case 4:
					transform.localEulerAngles = new Vector3(0,0,90);
					break;
				case 6:
					transform.localEulerAngles = new Vector3(0,0,-90);
					break;
				case 7:
					transform.localEulerAngles = new Vector3(0,0,135);
					break;
				case 8:
					transform.localEulerAngles = new Vector3(0,0,180);
					break;
				case 9:
					transform.localEulerAngles = new Vector3(0,0,-135);
					break;
				case 0:
					break;
			}
	}
	
	function GetCloser() {
	
		personSpeechObj.playVoice(1, "Acceptance");

		this.movDirection = GetCloserAngle(playerObj.transform.position.x - transform.position.x, playerObj.transform.position.y - transform.position.y);
		switch (movDirection) {
				case 1:
					transform.localEulerAngles = new Vector3(0,0,45);
					break;
				case 2:
					transform.localEulerAngles = new Vector3(0,0,0);
					break;
				case 3:
					transform.localEulerAngles = new Vector3(0,0,-45);
					break;
				case 4:
					transform.localEulerAngles = new Vector3(0,0,90);
					break;
				case 6:
					transform.localEulerAngles = new Vector3(0,0,-90);
					break;
				case 7:
					transform.localEulerAngles = new Vector3(0,0,135);
					break;
				case 8:
					transform.localEulerAngles = new Vector3(0,0,180);
					break;
				case 9:
					transform.localEulerAngles = new Vector3(0,0,-135);
					break;
				case 0:
					break;
			}
	}
	
		
	function GetAwayAngle(x : float, y : float) : int {
			if (x < 0) {
				if (y < 0) {
					return 3;
				} else {
					return 9;
				}
			} else {
				if (y < 0) {
					return 1;
				} else {
					return 7;
				}
			}
	}
	function GetCloserAngle(x : float, y : float) : int {
			if (x < 0) {
				if (y < 0) {
					return 7;
				} else {
					return 1;
				}
			} else {
				if (y < 0) {
					return 9;
				} else {
					return 3;
				}
			}
	}
	
	function CalMovement(){
		if( this.currentState == STATE_MOVING ){
			u = !!Mathf.Floor(Random.Range(0,2));
			l = !!Mathf.Floor(Random.Range(0,2));
			d = !!Mathf.Floor(Random.Range(0,2));
			r = !!Mathf.Floor(Random.Range(0,2));
			
			movDirection = u ? 
			(d ? (l ? (r ? 0 : 4) : (r ? 6 : 0)) : (l ? (r ? 2 : 1) : (r ? (l ? 2 : 3) : 2))) : 
			(l ? (r ? (d ? 8 : 0) : (d ? 7 : 4)) : (r ? (d ? 9 : 6) : (d ? 8 : 0)));			
			
			switch (movDirection) {
				case 1:
					transform.localEulerAngles = new Vector3(0,0,45);
					break;
				case 2:
					transform.localEulerAngles = new Vector3(0,0,0);
					break;
				case 3:
					transform.localEulerAngles = new Vector3(0,0,-45);
					break;
				case 4:
					transform.localEulerAngles = new Vector3(0,0,90);
					break;
				case 6:
					transform.localEulerAngles = new Vector3(0,0,-90);
					break;
				case 7:
					transform.localEulerAngles = new Vector3(0,0,135);
					break;
				case 8:
					transform.localEulerAngles = new Vector3(0,0,180);
					break;
				case 9:
					transform.localEulerAngles = new Vector3(0,0,-135);
					break;
				case 0:
					break;
			}
			
		}
			
	}


	function Start () {
		hasDelayed = false;
		hasSetCha = false;
		
		playerObj = GameObject.FindWithTag("Player");
		personSpeechObj = GetComponentInChildren(PersonSpeech);
		avoidanceRange = 5;
		buffer = 2;

		hatesPlayer = false;
		lovesPlayer = false;
	
	}

}
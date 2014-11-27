#pragma strict

class PlayerScript extends MonoBehaviour {
	var currentState : int;
	var playerData : Hashtable;
	var cha : int;
	var movDirection : int;
	var device : UnityEngine.DeviceType;
	var Timer : float;
	var cam : UnityEngine.GameObject;
	var animationScript : UnityEngine.Animator;
	var speed : float;

	var up0    : UnityEngine.KeyCode = UnityEngine.KeyCode.W;
	var left0  : UnityEngine.KeyCode = UnityEngine.KeyCode.A;
	var down0  : UnityEngine.KeyCode = UnityEngine.KeyCode.S;
	var right0 : UnityEngine.KeyCode = UnityEngine.KeyCode.D;
	var up1    : UnityEngine.KeyCode = UnityEngine.KeyCode.UpArrow;
	var left1  : UnityEngine.KeyCode = UnityEngine.KeyCode.LeftArrow;
	var down1  : UnityEngine.KeyCode = UnityEngine.KeyCode.DownArrow;
	var right1 : UnityEngine.KeyCode = UnityEngine.KeyCode.RightArrow;
	var quit : UnityEngine.KeyCode = UnityEngine.KeyCode.Escape;

	var personSpeechObj :  PersonSpeech;

	var u : boolean;
	var l : boolean;
	var d : boolean;
	var r : boolean;
	

	function Awake() {
		cam = UnityEngine.GameObject.FindWithTag( "MainCamera" );
		cam.transform.position = new Vector3(transform.position.x,transform.position.y,-10);
		gameObject.tag = "Player";
		speed = 2;
		SetResources();
		SetParams();
		personSpeechObj = GetComponentInChildren(PersonSpeech);
	}
	function Update() {

		if (Input.GetKeyDown ("space")) {
				personSpeechObj.playVoice (1, "Propose");
		}
		 if (UnityEngine.Input.GetKey(quit)) {
				Application.Quit();
		}
			GetPlayerInput();
			ExecutePlayerInput();
			
				switch (movDirection) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 6:
					case 7:
					case 8:
					case 9:
						transform.Translate(new Vector3( 0, Time.deltaTime * speed, 0));
						cam.transform.position = new Vector3(transform.position.x,transform.position.y,-10);
						animationScript.SetBool("Idle",false);
						if (!animationScript.GetCurrentAnimatorStateInfo(0).IsName("Hug")) {
							animationScript.SetTrigger("Walking");
						}
						break;
					case 0:
						animationScript.SetBool("Idle",true);
						break;
				}
			
		
	}
	function ExecutePlayerInput() {
		SetPlayerDirection();
	}
	/*
	▒███████▒████████▒▒████████
	██▒▒▒▒▒▒▒██▒▒▒▒▒▒▒▒▒▒▒██▒▒▒
	██▒▒▒██▒▒████████▒▒▒▒▒██▒▒▒
	▒██▒▒▒██▒██▒▒▒▒▒▒▒▒▒▒▒██▒▒▒
	▒▒█████▒▒████████▒▒▒▒▒██▒▒▒
	*/
	function GetPlayerInput() {
		u = (UnityEngine.Input.GetKey(up0) || UnityEngine.Input.GetKey(up1));
		l = (UnityEngine.Input.GetKey(left0) || UnityEngine.Input.GetKey(left1));
		d = (UnityEngine.Input.GetKey(down0) || UnityEngine.Input.GetKey(down1));
		r = (UnityEngine.Input.GetKey(right0) || UnityEngine.Input.GetKey(right1));
	}
	/*
	▒██████▒▒████████▒████████
	██▒▒▒▒▒▒▒██▒▒▒▒▒▒▒▒▒▒██▒▒▒
	▒██████▒▒████████▒▒▒▒██▒▒▒
	▒▒▒▒▒▒██▒██▒▒▒▒▒▒▒▒▒▒██▒▒▒
	▒██████▒▒████████▒▒▒▒██▒▒▒
	*/
	function SetPlayerDirection() {
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
  	function SetResources() {
  		device = SystemInfo.deviceType;
  	}
	function SetParams() {
		cha = GameObject.FindWithTag("Global").GetComponent(GlobalStorage).playerCha;
		animationScript = GetComponentInChildren(Animator);
	}
	
	function OnCollisionEnter2D( coll: Collision2D ){
		if(coll.collider.gameObject.tag == "NPC_Front"){
			
			coll.collider.gameObject.transform.parent.GetComponent(NPCScript).hatesPlayer = true;
			coll.collider.gameObject.transform.parent.GetComponent(NPCScript).lovesPlayer = false;
			if( !coll.collider.gameObject.transform.parent.GetComponent(NPCScript).hasHugged ){
				transform.parent.FindChild("Meter").gameObject.GetComponent(Meter).Cal(this, coll.collider.gameObject.transform.parent.GetComponent(NPCScript));
			}
			if (!animationScript.GetCurrentAnimatorStateInfo(0).IsName("Hug")) {
				animationScript.SetTrigger("Hugging");
				coll.collider.gameObject.transform.parent.GetComponent(NPCScript).hasHugged = true;
				coll.collider.gameObject.transform.parent.GetComponent(NPCScript).animationScript.SetTrigger("Hugging");
			}
		}
		else if( coll.collider.gameObject.tag == "NPC_Rear"){
			coll.collider.gameObject.transform.parent.GetComponent(NPCScript).hatesPlayer = true;
		}
	}
	
	
	
}
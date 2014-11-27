#pragma strict

class GlobalStorage extends MonoBehaviour{
	var hasStarted : boolean = false;
	var playerCha : int = 0;
	
	function Start () {
		if(!hasStarted){
			Debug.Log(playerCha);
			hasStarted = true;
		}
	}

	function Update () {

	}

	function Awake () {
		DontDestroyOnLoad (transform.gameObject);
		DontDestroyOnLoad (this);
	}
}
#pragma strict

class SceneMap extends MonoBehaviour {

	var data : Hashtable;
	var genData : Hashtable;
	var newPlayer : GameObject;
	var newNPC : GameObject;
	var coordGrid : boolean[,];
	var posX : int;
	var posY : int;

	function LoadData(){
		// Load data
	}
	function SaveData(){
		// save data
	}


	function GeneratePlayer(){
				posX = Mathf.FloorToInt(Random.Range(0,3));
				posY = Mathf.FloorToInt(Random.Range(0,3));
		var playerClone : GameObject = Instantiate( newPlayer, Vector3( posX, posY, 0  ), Quaternion.identity );
		var playerScript : PlayerScript = playerClone.gameObject.GetComponent( PlayerScript );
		playerClone.gameObject.name =  "Player";
		playerClone.transform.parent = this.transform;
		genData.Add( "Player", playerScript );
	}

	function GenerateNPCs(){
		NPCScript.NPCcount = 0;
		for( var i : int = 0; i < 10; i++ ){
			// fixme: don't spawn on top of each other
			do {
				posX = Mathf.FloorToInt(Random.Range(0,20));
				posY = Mathf.FloorToInt(Random.Range(0,20));
			} while (!coordGrid[posX, posY]);
			var npcClone : GameObject = Instantiate( newNPC, Vector3( posX, posY, 0  ), Quaternion.identity );
			var npcScript : NPCScript = npcClone.gameObject.GetComponent( NPCScript );
			npcClone.gameObject.name =  "NPC_" + i;
			npcClone.transform.parent = this.transform;
			genData.Add( "NPC_" + i, npcScript );
		}
	}

	function GenerateMeter(){
		//genData.Add( "Meter", new Meter() );
	}
	
	function GenerateMap(){
		coordGrid = new boolean[50,50];
		for( var i : int = 0; i < 50; i++ ){
			for( var j : int = 0; j < 50; j++){
				coordGrid[i,j] = true;
			}
		}
		//genData.Add( "Map", new Map() );
	}

	function GenerateObjects(){

		// Generate map
		GenerateMap();

		GeneratePlayer();
		
		GenerateNPCs();
		
		GenerateMeter();
	}
	function setParam() {
		this.gameObject.tag = "SceneMap";
	}

	function Start () {
		genData = new Hashtable();
		LoadData();
		setParam();
		GenerateObjects();
	}

	function Update () {

	}
	
}
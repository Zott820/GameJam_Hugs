#pragma strict

class Meter extends MonoBehaviour{

	var score     : double;
	var minReq    : double;
	var limit     : double;
	var scoreText : GUIText;
	var minimumScore : GUIText;
	var timerText : GUIText;
	var levelText : GUIText;
	var timer : float;

	var hasSetLimit : boolean = false;

	function Cal(p : PlayerScript, npc : NPCScript) {
		/* if diff is higher than buffer:
		 *   + regular point * mod (either crit or penalty)
		 * else:
		 *   + regular point
		 * then check the score against the limit
		 */
		 
		// Debug.Log("gere");
		if (Mathf.Abs(p.cha - npc.cha) > npc.buffer) {
			score += npc.score * Mod(p, npc);
		} else {
			score += npc.score;
		}
		//Debug.Log("change: " + npc.score);
		//CheckLimit(); Meant for a bar with maximum, otherwise just makes early levels easier.
		
		scoreText.guiText.text = "Score: " + score.ToString();
		
		//GameObject.FindWithTag("SceneMap").AddComponent(scoreText);
	}
	function Mod(p : PlayerScript, npc : NPCScript) : float {
		/* if player cha is lower than npc:
		 *   crit    ->  2.0
		 * else:
		 *   penalty -> -1.0
		 */
		return (p.cha > npc.cha) ? -1.0 : 2.0;
	}
	function Complete() : int {
		/* if score < minReq:
		 *   fail    -> 0
		 * else if score != limit:
		 *   success -> 1
		 * else:
		 *   crit    -> 2
		 */
		return (score < minReq) ? 0 : ((score != limit) ? 1 : 2);
	}
	function CheckLimit() {
		/* if score is beyond limit:
		 *   set score as limit
		 */
		if (score > limit) {
			score = limit;
		}
	}
	
	function Start () {
		this.gameObject.tag = "Meter";
		score = 0;
		timer = 20;
	}
	
	function SetLimit() {
		switch (GameObject.FindWithTag("Global").GetComponent(GlobalStorage).playerCha) {
			case 0:
				minReq = 10;
				limit = 20;
				break;
			case 1:
				minReq = 30;
				limit = 50;
				break;
			case 2:
				minReq = 80;
				limit = 100;
				break;
			case 3:
				minReq = 120;
				limit = 150;
				break;
			case 4:
				minReq = 200;
				limit = 300;
				break;
			case 5:
				minReq = 200;
				limit = 350;
				break;
			case 6:
				minReq = 250;
				limit = 350;
				break;
			case 7:
				minReq = 300;
				limit = 400;
				break;
			case 8:
				minReq = 300;
				limit = 300;
				break;
			case 9:
				minReq = 200;
				limit = 200;
				break;
			case 10:
				minReq = 200;
				limit = 200;
				break;
		}
	}

	function Update () {
		if (!hasSetLimit) {
			SetLimit();
			hasSetLimit = true;
			minimumScore.guiText.text = "Min. Score: " + minReq;
			levelText.guiText.text = "Level " + GameObject.FindWithTag("Global").GetComponent(GlobalStorage).playerCha;
		}
		
		timer -= (Time.deltaTime);
		timerText.guiText.text = "Time Left: " + timer + "s";
		if(timer <= 0){
			if (Complete() == 0) {
				GameObject.FindWithTag("Global").GetComponent(GlobalStorage).playerCha = 0;
				Application.LoadLevel(0);
			}	else {
				GameObject.FindWithTag("Global").GetComponent(GlobalStorage).playerCha++;
				Application.LoadLevel(0);
			}
		
		}
	}
}
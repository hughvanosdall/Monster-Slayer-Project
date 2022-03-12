function getRandomValue(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
 data() {
     return {
        pHealth: 100,
        mHealth: 100,
        currentRound: 0,
        winner: null,
        log: [],
     };
 },
 methods: {
     startGame() {
      this.pHealth = 100;
      this.mHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.log = [];
     },    
     attackMonster() {
        this.currentRound++;
        const attackValue = getRandomValue(5, 12);
        this.mHealth -= attackValue;
        this.addLogMessage('You', 'Attack', attackValue);
        this.attackPlayer();
     },
     attackPlayer() {
        const attackValue = getRandomValue(8, 18);
        this.pHealth -= attackValue;
        this.addLogMessage('Monster', 'Attack', attackValue);
        console.log(this.pHealth, this.mHealth, this.winner)
     },
     specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(15, 25)
      this.mHealth -= attackValue;
      this.addLogMessage('You', 'Special Attack', attackValue);
      this.attackPlayer();
   },
   healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20)
      if (this.pHealth + healValue > 100) {
         this.pHealth = 100;
      } else { this.pHealth += healValue;}
      this.addLogMessage('You', 'Healed', healValue);
      this.attackPlayer();
   },
   surrender() {
      this.winner = 'monster';
   },
   addLogMessage(who, what, value) {
      this.log.unshift({
         actionBy: who,
         actionType: what,
         actionValue: value
      })

   }
 },
 computed: {
   mBarStyles() {
      if(this.mHealth < 0) { 
        return {width: '0%'}
      }
      return { width: this.mHealth + '%' };
    },
    pBarStyles() {
      if(this.pHealth < 0) { 
        return {width: '0%'}
      }
      return { width: this.pHealth + '%' };
    },
   canUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
   }
 },
 watch: {
   pHealth(value) {
      if (value <= 0 && this.mHealth <= 0) {
         //Draw
         this.winner = 'draw';
      }else if(value <= 0){
         //Player Lost
         this.winner = 'monster';
      }
   },
   mHealth(value) {
      if (value <= 0 && this.pHealth <= 0) {
         //Draw
         this.winner = 'draw';
      }else if(value <=0){
         //Player Won
         this.winner = 'player';
      }
   }
 },
});

app.mount('#game')
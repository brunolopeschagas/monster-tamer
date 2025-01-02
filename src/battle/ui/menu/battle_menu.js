import Phaser from '../../../lib/phaser.js';
import { MONSTER_ASSET_KEYS } from "../../../assets/asset-keys.js";

const BATTLE_MENU_OPTIONS = Object.freeze({
    FIGHT: 'FIGHT',
    SWITCH: 'SWITCH',
    ITEM: 'ITEM',
    FLEE: 'FLEE',
});

const battleTextStyle = {
    color: 'black',
    fontSize: '30px',
};

export class BattleMenu {
    /**@type {Phaser.Scene} */
    #scene;

    /**@type {Phaser.GameObjects.Container} */
    #mainBattleMenuPhaserContainerGameObject;

    /**@type {Phaser.GameObjects.Container} */
    #moveSelectionSubBattleMenuPhaserContainerGameObject;
    
    /**@type {Phaser.GameObjects.Text} */
    #battleTextGameObjectLine1;
    
    /**@type {Phaser.GameObjects.Text} */
    #battleTextGameObjectLine2;
    
    /**@param {Phaser.Scene} scene */
    constructor(scene) {
        this.#scene = scene;
        this.#createMainInfoPane();
        this.#createMainBattleMenu();
        this.#createMonsterAttackSubMenu();
    }

    showMainBattleMenu(){
        this.#battleTextGameObjectLine1.setText('what shuld')
        this.#mainBattleMenuPhaserContainerGameObject.setAlpha(1);
        this.#battleTextGameObjectLine1.setAlpha(1);
        this.#battleTextGameObjectLine2.setAlpha(1);
    }

    hideMainBattleMenu(){
        this.#mainBattleMenuPhaserContainerGameObject.setAlpha(0);
        this.#battleTextGameObjectLine1.setAlpha(0);
        this.#battleTextGameObjectLine2.setAlpha(0);
    }

    showMonsterAttackSubMenu(){
        this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(1);
    }

    hideMonsterAttackSubMenu(){
        this.#moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(0);
    }

    /** @param {import('../../../common/direction.js').Direction | 'OK' | 'CANCEL'} input*/
    handlePlayerInput(input){
        console.log(input);
        if(input === 'CANCEL'){
            this.hideMonsterAttackSubMenu();
            this.showMainBattleMenu();
            return;
        }else if(input === 'OK'){
            this.hideMainBattleMenu();
            this.showMonsterAttackSubMenu();
        }
    }

    #createMainInfoPane() {
        const padding = 4;
        const rectangleHeight = 124;
        this.#scene.add.rectangle(
            padding,
            this.#scene.scale.height - rectangleHeight - padding,
            this.#scene.scale.width - padding * 2,
            rectangleHeight,
            0xede4f3,
            1
        ).setOrigin(0)
            .setStrokeStyle(8, 0xe4434a, 1);
    }


    #createMainBattleMenu() {
        this.#battleTextGameObjectLine1 = this.#scene.add.text(20, 468, 'what should', battleTextStyle);
        this.#battleTextGameObjectLine2 = this.#scene.add.text(20, 512, MONSTER_ASSET_KEYS.IGUANIGNITE + ' do next?', battleTextStyle);
        this.#mainBattleMenuPhaserContainerGameObject = 
        this.#scene.add.container(520, 448,
            [
                this.#createMainInfoSubPane(),
                this.#scene.add.text(55, 22, BATTLE_MENU_OPTIONS.FIGHT, battleTextStyle),
                this.#scene.add.text(240, 22, BATTLE_MENU_OPTIONS.SWITCH, battleTextStyle),
                this.#scene.add.text(55, 70, BATTLE_MENU_OPTIONS.ITEM, battleTextStyle),
                this.#scene.add.text(240, 70, BATTLE_MENU_OPTIONS.FLEE, battleTextStyle),
            ]
        );
        this.hideMainBattleMenu();
    }


    #createMainInfoSubPane() {
        const rectangleWidth = 500;
        const rectangleHeight = 124;
        return this.#scene.add.rectangle(
            0,
            0,
            rectangleWidth,
            rectangleHeight,
            0xede4f3,
            1
        ).setOrigin(0)
            .setStrokeStyle(8, 0x905ac2, 1);
    }

    #createMonsterAttackSubMenu() {
        this.#moveSelectionSubBattleMenuPhaserContainerGameObject = 
        this.#scene.add.container(0, 448,
            [
                this.#scene.add.text(55, 22, 'slash', battleTextStyle),
                this.#scene.add.text(240, 22, 'slash', battleTextStyle),
                this.#scene.add.text(55, 70, 'slash', battleTextStyle),
                this.#scene.add.text(240, 70, 'slash', battleTextStyle),
            ]
        );
        this.hideMonsterAttackSubMenu();
    }

    
}
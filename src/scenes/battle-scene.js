import { BATTLE_ASSET_KEYS, BATTLE_BACKGROUND_ASSET_KEYS, HEATL_BAR_ASSET_KEYS, MONSTER_ASSET_KEYS } from "../assets/asset-keys.js";
import { BattleMenu } from "../battle/ui/menu/battle_menu.js";
import { DIRECTION } from "../common/direction.js";
import Phaser from "../lib/phaser.js";
import { SCENE_KEYS } from "./scene-keys.js";


export class BattleScene extends Phaser.Scene {

    /**@type {BattleMenu} */
    #battleMenu;
    
    /**@type {Phaser.Types.Input.Keyboard.CursorKeys} */
    #cursorKeys

    constructor() {
        super({
            key: SCENE_KEYS.BATTLE_SCENE,
        });
    }

    create() {
        console.log(BattleScene.name + ' create');
        this.#renderBackgroundImage();
        this.#renderMonsters();

        const playerMonsterName = this.add.text(30, 20, MONSTER_ASSET_KEYS.IGUANIGNITE,
            {
                color: '#7e3d3f',
                fontSize: '32px',
            }
        );
        this.add.container(556, 318,
            [
                this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND).setOrigin(0),
                playerMonsterName,
                this.#createHealthBar(34, 34),
                this.add.text(playerMonsterName.width + 35, 23, 'L5',
                    {
                        color: '#ed474b',
                        fontSize: '28px',
                    }
                ),
                this.add.text(30, 55, 'HP',
                    {
                        color: '#ed474b',
                        fontSize: '28px',
                        fontStyle: 'italic',
                    }
                ),
                this.add.text(443, 80, '25/25',
                    {
                        color: '#7e3d3f',
                        fontSize: '16px',
                    }
                ).setOrigin(1, 0),
            ]
        );

        const enemyMonsterName = this.add.text(30, 20, MONSTER_ASSET_KEYS.CARNODUSK,
            {
                color: '#7e3d3f',
                fontSize: '32px',
            }
        );
        this.add.container(0, 0,
            [
                this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND).setOrigin(0),
                enemyMonsterName,
                this.#createHealthBar(34, 34),
                this.add.text(enemyMonsterName.width + 35, 23, 'L5',
                    {
                        color: '#ed474b',
                        fontSize: '28px',
                    }
                ),
                this.add.text(30, 55, 'HP',
                    {
                        color: '#ed474b',
                        fontSize: '28px',
                        fontStyle: 'italic',
                    }
                ),
            ]
        );

        this.#battleMenu = new BattleMenu(this);
        this.#battleMenu.showMainBattleMenu();

        this.#cursorKeys = this.input.keyboard.createCursorKeys();
    }

    update(){
        const wasSpaceKeyPressed = Phaser.Input.Keyboard.JustDown(this.#cursorKeys.space);
        if(wasSpaceKeyPressed){
            this.#battleMenu.handlePlayerInput('OK');
            return;
        }else if(Phaser.Input.Keyboard.JustDown(this.#cursorKeys.shift)){
            this.#battleMenu.handlePlayerInput('CANCEL');
            return;
        }

        /** @type { import("../common/direction.js").Direction} */
        let selectedDirection = DIRECTION.NONE;
        if(this.#cursorKeys.left.isDown){
            selectedDirection = DIRECTION.LEFT;
        } else if(this.#cursorKeys.right.isDown){
            selectedDirection = DIRECTION.RIGHT;
        } else if(this.#cursorKeys.down.isDown){
            selectedDirection = DIRECTION.DOWN;
        } else if(this.#cursorKeys.up.isDown){
            selectedDirection = DIRECTION.UP;
        }

        if(selectedDirection !== DIRECTION.NONE){
            this.#battleMenu.handlePlayerInput(selectedDirection);
        }

    }


    #renderBackgroundImage() {
        this.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.FOREST).setOrigin(0, 0);
    }

    #renderMonsters() {
        this.add.image(768, 144, MONSTER_ASSET_KEYS.CARNODUSK, 0);
        this.add.image(256, 316, MONSTER_ASSET_KEYS.IGUANIGNITE, 0).setFlipX(true);
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {Phaser.GameObjects.Container}
     */
    #createHealthBar(x, y) {
        const letfCap = this.add.image(x, y, HEATL_BAR_ASSET_KEYS.LEFT_CAP).setOrigin(0, 0.5);
        const midleCap = this.add.image(letfCap.x + letfCap.width, y, HEATL_BAR_ASSET_KEYS.MIDDLE_CAP).setOrigin(0, 0.5);
        midleCap.displayWidth = 360;
        const rightCap = this.add.image(midleCap.x + midleCap.displayWidth, y, HEATL_BAR_ASSET_KEYS.RIGHT_CAP).setOrigin(0, 0.5);
        return this.add.container(x, y, [letfCap, midleCap, rightCap]);
    }


}
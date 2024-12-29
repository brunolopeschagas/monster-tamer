import { BATTLE_ASSET_KEYS, BATTLE_BACKGROUND_ASSET_KEYS, HEATL_BAR_ASSET_KEYS, MONSTER_ASSET_KEYS } from "../assets/asset-keys.js";
import Phaser from "../lib/phaser.js";
import { SCENE_KEYS } from "./scene-keys.js";

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.PRELOAD_SCENE,
        });
    }

    preload() {
        console.log(PreloadScene.name + ' preload');
        this.load.image(
            BATTLE_BACKGROUND_ASSET_KEYS.FOREST,
            'assets/images/monster-tamer/battle-backgrounds/forest-background.png'
        );
        this.load.image(
            BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND,
            'assets/images/kenneys-assets/ui-space-expansion/custom-ui.png'
        );
        this.load.image(
            HEATL_BAR_ASSET_KEYS.RIGHT_CAP,
            'assets/images/kenneys-assets/ui-space-expansion/barHorizontal_green_right.png'
        );
        this.load.image(
            HEATL_BAR_ASSET_KEYS.LEFT_CAP,
            'assets/images/kenneys-assets/ui-space-expansion/barHorizontal_green_left.png'
        );
        this.load.image(
            HEATL_BAR_ASSET_KEYS.MIDDLE,
            'assets/images/kenneys-assets/ui-space-expansion/barHorizontal_green_mid.png'
        );
        this.load.image(
            MONSTER_ASSET_KEYS.CARNODUSK,
            'assets/images/monster-tamer/monsters/carnodusk.png'
        );

        this.load.image(
            MONSTER_ASSET_KEYS.IGUANIGNITE,
            'assets/images/monster-tamer/monsters/iguanignite.png'
        );
    }

    create() {
        console.log(PreloadScene.name + ' create');
        this.scene.start(SCENE_KEYS.BATTLE_SCENE);
    }
}
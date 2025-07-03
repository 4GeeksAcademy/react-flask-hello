import Phaser from 'phaser';
import { GridObject } from '../objects/gridObject';
import { ServerObject } from '../objects/serverObject';
import { ZombieObject } from '../objects/zombieObject';
import { EffectsObjects } from '../objects/effectsObject';
import { TurretObject } from '../objects/turretObject';
import { EventBus } from '../EventBus';
import { BulletObject } from '../objects/bulletObject';
import { levels } from '../config/levels';

export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }

    create() {

        this.level = levels[0];

        this.cameras.main.setBackgroundColor('#1c1f2b');
        this.physics.resume();

        this.grid = new GridObject(this, this.level.gridCols);
        this.grid.createGrid();

        this.server = new ServerObject(this, this.level.serverHealth, this.level.gridCols, this.level.serverCols);
        this.server.createServers();

        this.zombies = this.physics.add.group();
        this.zombieManager = new ZombieObject(this, this.level.zombieVelocityY, this.level.zombieHealth, this.level.zombieDamage);
        this.zombieManager.createZombie();

        this.turret = new TurretObject(this, this.level.turretHealth, this.level.gridCols, this.level.serverCols);
        this.turret.createTurrets();

        this.bulletManager = new BulletObject(this);
        this.effects = new EffectsObjects(this);
        this.effects.resetEmitters();

        this.bgMusic = this.sound.add('closeEncounter4', {
            loop: true,
            volume: 0.8 // Ajusta el volumen entre 0 y 1
        });
        this.bgMusic.play();

        // --- COLISIÓN ZOMBIE-SERVER ---
        this.physics.add.collider(
            this.zombies,
            this.server.servers,
            (server, zombie) => {
                this.effects.bloodEmitter(zombie);
                this.effects.sparkEmitter(server);
                this.server.receiveDamage(this, server, Number(zombie.getData('damage')));
                this.zombieManager.destroyZombie(zombie);
                this.sound.play('zombieDead2');
            },
            null,
            this
        );
        // --- COLISIÓN ZOMBIE-TURRET ---
        this.physics.add.collider(
            this.zombies,
            this.turret.turrets,
            (turret, zombie) => {
                this.effects.bloodEmitter(zombie, 0, -15);
                this.effects.explosionFireEmitter(turret);
                this.turret.receiveDamage(this, turret, Number(zombie.getData('damage')));
                this.zombieManager.destroyZombie(zombie);
                this.sound.play('zombieDead2');
            },
            null,
            this
        );

        // --- DISPARO AUTOMÁTICO DE TORRETAS ---
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.turret.turrets.forEach((turret) => {
                    const turretCol = turret.getData('col');
                    const zombiesInCol = this.zombies.getChildren().filter(zombie => zombie.getData('col') === turretCol);
                    if (zombiesInCol.length > 0) {
                        this.bulletManager.fireBullet(this, turret, this.level.bulletDamage, this.level.bulletVelocityY);
                    }
                });
            },
            loop: true
        });

        // --- COLISIÓN BALA-ZOMBIE ---
        this.physics.add.overlap(this.bulletManager.bullets, this.zombies, (bullet, zombie) => {
            const damage = bullet.getData('damage');
            this.zombieManager.receiveDamage(this, zombie, damage);
            const emitter = bullet.getData('rocketEmitter');
            if (emitter) emitter.destroy();
            bullet.destroy();
        }, null, this);
    }

    update() {

        // Actualizar barras de vida de zombies
        if (this.zombieUpdatables) {
            this.zombieUpdatables = this.zombieUpdatables.filter(zombie => zombie.active);
            this.zombieUpdatables.forEach(zombie => {
                if (zombie.update) zombie.update();
            });
        }

        this.time.addEvent({
            delay: 3000,
            callback: () => {
                if (this.zombies.getChildren().length < 10) {
                    this.zombieManager.createZombie(this.level.zombieVelocityY, this.level.zombieHealth, this.level.zombieDamage);
                }
            },
            loop: true
        });
        // Mover y destruir balas fuera de pantalla
        this.bulletManager.bullets.children.iterate((bullet) => {
            if (bullet && bullet.active) {
                if (bullet.y > this.sys.game.config.height) {
                    const emitter = bullet.getData('rocketEmitter');
                    if (emitter) emitter.destroy();
                    bullet.destroy();
                }
            }
        });
    }


}
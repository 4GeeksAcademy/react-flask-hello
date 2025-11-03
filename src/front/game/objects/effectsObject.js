// Clase para utilidades de efectos visuales
export class EffectsObjects {
    constructor(scene) {
        this.scene = scene;
    }

    resetEmitters() {
        this.scene.bloodEmitter = null;
        this.scene.sparkEmitter = null;
        this.scene.explosionFireEmitter = null;
        this.scene.explosionEmitter = null;
    }

    handleZombieHit(bullet, zombie) {
        const emitter = bullet.getData('rocketEmitter');
        if (emitter) emitter.destroy();
        const damage = bullet.getData('damage') || 1;
        bullet.destroy();
        const health = zombie.getData('health') - damage;
        zombie.setData('health', health);

        // Mostrar daño flotante
        const damageText = this.scene.add.text(zombie.x + 20, zombie.y - 20, `-${damage}`,
            { font: '23px Arial', fill: '#ff0000', stroke: '#fff', strokeThickness: 3 })
            .setOrigin(0.5);
        this.scene.tweens.add({
            targets: damageText,
            x: damageText.x + 50,
            y: damageText.y - 70,
            alpha: 0,
            duration: 1500,
            ease: 'Cubic.easeOut',
            onComplete: () => damageText.destroy()
        });

        if (health <= 0) {
            this.scene.explosionEmitter.explode(80, zombie.x, zombie.y);
            zombie.destroy();
            this.scene.kills += 1;
            this.scene.killText.setText(`Zombies eliminados: ${this.scene.kills}`);
        } else {
            zombie.setTint(Phaser.Display.Color.GetColor(255, health * 25, 0));
            this.scene.explosionEmitter.explode(5, zombie.x, zombie.y);
        }
    }

    sparkEmitter(target, x = 0, y = 0) {
        // Efecto de chispas al colisionar, recibe un target y desfasamiento de posición del efecto
        if (!this.scene.sparkEmitter) {
            this.scene.sparkEmitter = this.scene.add.particles(0, 0, 'spark', {
                speed: { min: 100, max: 150 },
                angle: { min: 240, max: 300 },
                lifespan: 600,
                quantity: 0,
                scale: { start: 0.3, end: 0 },
                alpha: { start: 1, end: 0 },
                tint: 0xffff00,
                on: false,
            });
            this.scene.sparkEmitter.setDepth(4);
        }
        // Explota chispas en la posición de la colisión
        this.scene.sparkEmitter.explode(10, target.x + x, target.y + y);
    }

    bloodEmitter(target, x = 0, y = 0, quantity = 10) {
        // Efecto de sangre al colisionar, recibe un target y desfasamiento de posición del efecto
        if (!this.scene.bloodEmitter) {
            this.scene.bloodEmitter = this.scene.add.particles(0, 0, 'blood', {
                speed: { min: 1, max: 25 },
                angle: { min: 0, max: 360 },
                lifespan: 1500,
                quantity: 0,
                scale: { start: 0.3, end: 0 },
                alpha: { start: 1, end: 0 },
                tint: 0xffff00,
                on: false,
            });
            this.scene.bloodEmitter.setDepth(4);
        }
        // Explota sangre en la posición de la colisión
        this.scene.bloodEmitter.explode(quantity, target.x + x, target.y + y);
    }

    explosionFireEmitter(target, x = 0, y = 0) {
        // Efecto de sangre al colisionar, recibe un target y desfasamiento de posición del efecto
        if (!this.scene.explosionFireEmitter) {
            this.scene.explosionFireEmitter = this.scene.add.particles(0, 0, 'explosion_fire', {
                speed: { min: 1, max: 25 },
                angle: { min: 0, max: 360 },
                lifespan: 1500,
                quantity: 0,
                scale: { start: 0.3, end: 0 },
                alpha: { start: 1, end: 0 },
                tint: 0xffff00,
                on: false,
            });
            this.scene.explosionFireEmitter.setDepth(4);
        }
        // Explota sangre en la posición de la colisión
        this.scene.explosionFireEmitter.explode(3, target.x + x, target.y + y);
    }
}

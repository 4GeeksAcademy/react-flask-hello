// Clase para gestionar balas
export class BulletObject {
    constructor(scene) {
        this.scene = scene;
        this.bullets = scene.physics.add.group();
        scene.bullets = this.bullets;
    }

    fireBullet(scene, turret, damage = 100, velocityY = 100) {
        const bullet = this.scene.physics.add.image(turret.x, turret.y + 25, 'bullet');
        bullet.setDisplaySize(16, 20);
        bullet.body.setAllowGravity(false);
        bullet.setData('damage', damage);
        bullet.setActive(true);
        bullet.setVisible(true);
        this.bullets.add(bullet);
        bullet.setVelocityY(velocityY);
        // Efecto de partículas opcional
        const rocketEmitter = this.scene.add.particles(0, -13, 'bullet', {
            speed: { min: 10, max: 30 },
            angle: { min: 260, max: 280 },
            scale: { start: 0.20, end: 0 },
            alpha: { start: 0.7, end: 0 },
            lifespan: 400,
            quantity: 1,
            frequency: 40,
            follow: bullet
        });
        bullet.setData('rocketEmitter', rocketEmitter);
        this.scene.sound.play('shot');
        return bullet;
    }
}

class PhysicsWorldCharacter{
    constructor(){
        Laya3D.init(0, 0);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Stat.show();
        this.scene = Laya.stage.addChild(new Laya.Scene3D());
        this.camera = this.scene.addChild(new Laya.Camera(0, 0.1, 100));
        this.camera.transform.translate(new Laya.Vector3(0, 8, 20));
        this.camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        this.camera.clearColor = null;
        var directionLight = this.scene.addChild(new Laya.DirectionLight());
        directionLight.color = new Laya.Vector3(1, 1, 1);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(-1.0, -1.0, 1.0));
        var plane = this.scene.addChild(new Laya.MeshSprite3D(new Laya.PlaneMesh(20, 20, 10, 10)));
        var planeMat = new Laya.BlinnPhongMaterial();
        Laya.Texture2D.load("res/threeDimen/Physics/wood.jpg", Laya.Handler.create(null, function (tex) {
            planeMat.albedoTexture = tex;
        }));
        planeMat.tilingOffset = new Laya.Vector4(2, 2, 0, 0);
        plane.meshRenderer.material = planeMat;
        var rigidBody = plane.addComponent(Laya.PhysicsCollider);
        var boxShape = new Laya.BoxColliderShape(20, 0, 20);
        rigidBody.colliderShape = boxShape;
        for (var i = 0; i < 60; i++) {
            this.addBox();
            this.addCapsule();
        }
        this.addCharacter();
    }

    addCharacter() {
        Laya.Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Laya.Handler.create(this, function (monkey) {
            this.scene.addChild(monkey);
            monkey.transform.localScale = new Laya.Vector3(1, 1, 1);
            var character = monkey.addComponent(Laya.CharacterController);
            var sphereShape = new Laya.CapsuleColliderShape(1.0, 3.4);
            sphereShape.localOffset = new Laya.Vector3(0, 1.7, 0);
            character.colliderShape = sphereShape;
            this.kinematicSphere = monkey;
            Laya.timer.frameLoop(1, this, this.onKeyDown);
        }));
    }
    onKeyDown() {
        var character = this.kinematicSphere.getComponent(Laya.CharacterController);
        Laya.KeyBoardManager.hasKeyDown(87) && character.move(new Laya.Vector3(0, 0, -0.2)); //W
        Laya.KeyBoardManager.hasKeyDown(83) && character.move(new Laya.Vector3(0, 0, 0.2)); //S
        Laya.KeyBoardManager.hasKeyDown(65) && character.move(new Laya.Vector3(-0.2, 0, 0)); //A
        Laya.KeyBoardManager.hasKeyDown(68) && character.move(new Laya.Vector3(0.2, 0, 0)); //D
        Laya.KeyBoardManager.hasKeyDown(69) && character.jump(); //E
    }
    addBox() {
        var mat1 = new Laya.BlinnPhongMaterial();
        Laya.Texture2D.load("res/threeDimen/Physics/rocks.jpg", Laya.Handler.create(this, function (tex) {
            mat1.albedoTexture = tex;
        }));
        var sX = Math.random() * 0.75 + 0.25;
        var sY = Math.random() * 0.75 + 0.25;
        var sZ = Math.random() * 0.75 + 0.25;
        var box = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(sX, sY, sZ)));
        box.meshRenderer.material = mat1;
        box.transform.position = new Laya.Vector3(Math.random() * 4 - 2, 2, Math.random() * 4 - 2);
        box.transform.rotationEuler = new Laya.Vector3(Math.random() * 360, Math.random() * 360, Math.random() * 360);
        var rigidBody = box.addComponent(Laya.Rigidbody3D);
        var boxShape = new Laya.BoxColliderShape(sX, sY, sZ);
        rigidBody.colliderShape = boxShape;
        rigidBody.mass = 10;
    }
    addCapsule() {
        var mat3 = new Laya.BlinnPhongMaterial();
        Laya.Texture2D.load("res/threeDimen/Physics/wood.jpg", Laya.Handler.create(this, function (tex) {
            mat3.albedoTexture = tex;
        }));
        var raidius = Math.random() * 0.2 + 0.2;
        var height = Math.random() * 0.5 + 0.8;
        var capsule = this.scene.addChild(new Laya.MeshSprite3D(new Laya.CapsuleMesh(raidius, height)));
        capsule.meshRenderer.material = mat3;
        capsule.transform.position = new Laya.Vector3(Math.random() * 4 - 2, 2, Math.random() * 4 - 2);
        capsule.transform.rotationEuler = new Laya.Vector3(Math.random() * 360, Math.random() * 360, Math.random() * 360);
        var rigidBody = capsule.addComponent(Laya.Rigidbody3D);
        var sphereShape = new Laya.CapsuleColliderShape(raidius, height);
        rigidBody.colliderShape = sphereShape;
        rigidBody.mass = 10;
    }
}


//激活启动类
new PhysicsWorldCharacter();
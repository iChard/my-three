import * as THREE from 'three';
import React from 'react';

function getParentInstance(component: React.Component) {
    const fiber = (component as any)._reactInternalFiber
    if (fiber) {
        let parent = fiber.return;
        while (parent) {
            if (parent.tag === 1) {
                return parent.stateNode
            }
            parent = parent.return;
        }
    }
}

class MemoComponent<P={}, S={}> extends React.Component<P, S> {
    protected autoInsert = true;
    protected mesh: THREE.Mesh | THREE.Object3D

    componentWillUnmount() {
        this.mesh = this.buildMesh()
        this.insertMesh()
    }

    buildMesh(): THREE.Object3D {
        return new THREE.Object3D()
    }

    private insertMesh() {
        if(this.autoInsert) {
            this.mesh.name = this.constructor.name;
        }
    }
}
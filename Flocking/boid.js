let perceptionRadius = 100;
let MaxForce = 0.5;

class boid{
    constructor(x,y){
        this.position= createVector(random(width), random(height));
        this.velocity = createVector();
        this.velocity = p5.Vector.random2D(); 
        this.acceleration = createVector();
    }

    alignment(flock){
        let force = createVector();
        let NumOfLocals = 0;
        for (let other of flock){
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (this !== other && distance <= perceptionRadius){
                force.add(other.velocity);
                NumOfLocals++;
            }
        }
        if (NumOfLocals > 0){
        force.div(NumOfLocals);
        }
        force.limit(MaxForce);
        return force;
    }

    cohesion(flock){
        let force = createVector();
        let NumOfLocals = 0;
        for (let other of flock){
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (this !== other && distance <= perceptionRadius){
                force.add(other.position);
                NumOfLocals++;
            }
        }
        if (NumOfLocals > 0){
            force.div(NumOfLocals);
        }
        force.sub(this.position);
        force.limit(MaxForce);
        return force;
    }

    separation(flock){
        let force = createVector();
        let NumOfLocals = 0;
        let currentForce = createVector();
        for (let other of flock){
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (this !== other && distance <= perceptionRadius){
                currentForce = p5.Vector.sub(this.position, other.position);
                if (distance > 0){
                currentForce.div(distance ^ 2);
                }
                force.add(currentForce);
            }
        if (NumOfLocals > 0){
            force.div(NumOfLocals);
        }
        }
        force.limit(MaxForce);
        return force;
    }

    update(flock){
        this.acceleration.setMag(0);
        this.acceleration.add(this.alignment(flock).mult(alignmentSlider.value()));
        this.acceleration.add(this.cohesion(flock)).mult(cohesionSlider.value());
        this.acceleration.add(this.separation(flock).mult(separationSlider.value()));

        this.velocity.add(this.acceleration);
        this.velocity.setMag(4);
        this.position.add(this.velocity);
    }

    show() {
        strokeWeight(16);
        stroke(255);
        this.LoopEdges();
        point(this.position.x, this.position.y);
    }

    LoopEdges(){
        if (this.position.x > width) {
            this.position.x = 0;
          } else if (this.position.x < 0) {
            this.position.x = width;
          }
          if (this.position.y > height) {
            this.position.y = 0;
          } else if (this.position.y < 0) {
            this.position.y = height;
          }
    }
}
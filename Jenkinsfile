pipeline {
    agent any

    environment {
        // Define Docker image name and tag
        DOCKER_IMAGE = 'my-ecommerce-app'
        DOCKER_TAG = 'latest'
        DOCKER_REGISTRY = 'your-docker-registry-url'
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
    }

    stages {
        stage('Checkout') {
            steps {
                // Pull the latest code from the repository
                git url: 'https://your-repo-url.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build the Docker image
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Test') {
            steps {
                // Here you would run any tests required for the application
                echo 'Running tests...'
                // Example: sh 'npm test'
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    // Login to Docker registry
                    docker.withRegistry("https://${DOCKER_REGISTRY}", "${DOCKER_CREDENTIALS_ID}") {
                        // Push the Docker image
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy the Docker container on your server/environment
                    // Example using Docker Compose or SSH command for deployment
                    echo 'Deploying application...'
                    // Example SSH command to pull the latest image and restart the container:
                    // sh "ssh -i /path/to/ssh-key user@your-server 'docker pull ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG} && docker run -d -p 80:80 ${DOCKER_IMAGE}:${DOCKER_TAG}'"
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs() // Clean up the workspace
        }
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}

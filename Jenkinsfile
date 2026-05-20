pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('server') {
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t smartcart-ai .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                echo "Checking Docker..."

                docker info || exit 1

                docker stop smartcart-ai || true
                docker rm smartcart-ai || true

                lsof -ti :3001 | xargs kill -9 || true

                docker run -d --name smartcart-ai -p 3001:3001 smartcart-ai
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                    sh '''
                    sonar-scanner \
                    -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
            }
        }

        stage('Monitoring') {
            steps {
                sh '''
                sleep 10
                docker ps
                docker logs smartcart-ai
                curl http://localhost:3001/health
                '''
            }
        }

        stage('Security Scan') {
            steps {
                sh 'npm audit --audit-level=high'
            }
}

    }
}
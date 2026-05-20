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
                sh 'docker run -d -p 3001:3001 smartcart-ai || true'
            }
        }
    }
}
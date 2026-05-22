pipeline {
    agent any

    environment {
        IMAGE_NAME = "smartcart-ai"
        IMAGE_TAG = "v1.${BUILD_NUMBER}"
        CONTAINER_NAME = "smartcart-ai"
    }

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
                    sh 'npm test -- --coverage'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {

                        sh '''
                        sonar-scanner \
                        -Dsonar.projectKey=HD \
                        -Dsonar.login=$SONAR_TOKEN
                        '''
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Security Scan') {
            steps {
                dir('server') {
                    sh 'npm audit --audit-level=high'
                }

                sh '''
                docker scout quickview ${IMAGE_NAME}:${IMAGE_TAG} || true
                '''
            }
        }

        stage('Deploy to Staging') {
            steps {
                sh '''
                echo "Checking Docker..."

                docker info || exit 1

                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true

                lsof -ti :3001 | xargs kill -9 || true

                docker run -d \
                    --name ${CONTAINER_NAME} \
                    -p 3001:3001 \
                    ${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }

        stage('Monitoring') {
            steps {
                sh '''
                echo "Waiting for container startup..."
                sleep 10

                echo "Running containers:"
                docker ps

                echo "Application logs:"
                docker logs ${CONTAINER_NAME}

                echo "Health check:"
                curl http://localhost:3001/health
                '''
            }
        }

        stage('Release') {
            steps {
                sh '''
                echo "Creating release tag..."

                git tag release-${IMAGE_TAG} || true

                echo "Release version:"
                echo ${IMAGE_TAG}
                '''
            }
        }
    }

    post {

        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }

        always {
            echo 'Cleaning workspace...'

            cleanWs()
        }
    }
}
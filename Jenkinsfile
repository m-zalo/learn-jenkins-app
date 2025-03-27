pipeline {
    agent any
    
    tools{
        nodejs('23.10')
    }
    
    stages {
        stage('Build') {
            steps {
                sh '''
                    node -- version
                    npm --version
                    npm ci
                    npm build run
                '''
            }
        }
    }

    post {
        always {

        }
        success {

        }
        failure {

        }
    }
}
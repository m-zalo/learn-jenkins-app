pipeline {
    agent any
    
    tools{
        nodejs('23.10')
    }
    
    stages {        
        stage('Build') {
            steps {
                sh '''
                    node --version
                    npm --version
                    npm ci
                    npm run build
                '''
            }
        }

        stage('Test'){
            steps {
                sh'''
                    test -f ./build/index.html
                    npm test
                '''
            }
        }

        post {
            always {
                junit 'test-results/junit.xml'
            }
        }
    }
}
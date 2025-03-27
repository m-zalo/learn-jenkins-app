pipeline {
    agent any
    
    tools{
        nodejs('23.10')
    }
    
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
                sh '''
                    whoami
                    npm --version
                '''
            }
        }
    }
}
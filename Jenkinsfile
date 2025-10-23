@Library('db-operations@dev') _

pipeline {
    agent any

    tools {
        nodejs "Node 20"
    }

    environment {
        AWS_REGION = 'us-east-1'
        REPO_URL = 'https://github.com/CCAFS/MARLO-INNOVATION-CATALOG.git'
        BRANCH = 'dev'
        API_SECRET_ID = 'dev/app/frontend/marlo/innovation-catolog'
        LAMBDA_FUNCTION_NAME = 'innovation-catalog-client-dev'
    }

    stages {
        stage('Start') {
            steps {
                script {
                    env.STAGE_NAME = 'Start'
                }
                slackSend(
                    color: '#FFFF00',
                    message: "*[INNOVATION CATALOG]*: *(DEV)* - Frontend CI/CD started :fire:",
                    channel: "#notifications-platform",
                    tokenCredentialId: 'slack-token',
                    botUser: true,
                    attachments: [[
                        title: "CI/CD Start Details",
                        color: "#FFFF00",
                        fields: [
                            [title: "Stage", value: env.STAGE_NAME, short: true],
                            [title: "Job", value: env.JOB_NAME, short: true],
                            [title: "Build Number", value: env.BUILD_NUMBER, short: true]
                        ]
                    ]]
                )
            }
        }

        stage('Checkout') {
            steps {
                script {
                    env.STAGE_NAME = 'Checkout'
                }
                git branch: env.BRANCH, url: env.REPO_URL
            }
        }

        stage('Prepare Metadata') {
            steps {
                script {
                    env.STAGE_NAME = 'Prepare Metadata'
                    env.LAMBDA_ZIP = "innovation-catalog-client-${env.BUILD_NUMBER}.zip"
                }
            }
        }

        stage('Build & Package Frontend') {
            steps {
                script {
                    env.STAGE_NAME = 'Build & Package Frontend'
                }
                withCredentials([aws(accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'prms-test-aws-creds', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    dir('client') {
                        sh '''
                            set -e

                            if ! command -v jq >/dev/null 2>&1; then
                                echo "ERROR: jq is required on the Jenkins agent"
                                exit 1
                            fi

                            ARTIFACT_NAME="${LAMBDA_ZIP:-lambda-package.zip}"

                            SECRET_JSON=$(aws secretsmanager get-secret-value \
                                --region "$AWS_REGION" \
                                --secret-id "$API_SECRET_ID" \
                                --query SecretString --output text)

                            LOCAL_API=$(printf '%s' "$SECRET_JSON" | jq -r .LOCAL_API)
                            REAL_API=$(printf '%s' "$SECRET_JSON" | jq -r .REAL_API)

                            if [ -z "$LOCAL_API" ] || [ -z "$REAL_API" ] || [ "$LOCAL_API" = "null" ] || [ "$REAL_API" = "null" ]; then
                                echo "ERROR: Missing LOCAL_API or REAL_API in secret $API_SECRET_ID"
                                exit 1
                            fi

                            HOST_UID=$(id -u)
                            HOST_GID=$(id -g)

                            rm -f "$ARTIFACT_NAME"

                            docker run --rm -v "$PWD":/work alpine sh -lc "
                                rm -rf /work/node_modules /work/dist /work/.astro || true
                                chown -R ${HOST_UID}:${HOST_GID} /work
                            "

                            docker run --rm \
                                --user ${HOST_UID}:${HOST_GID} \
                                -e HOME=/tmp \
                                -e XDG_CONFIG_HOME=/tmp/.config \
                                -e ASTRO_TELEMETRY_DISABLED=1 \
                                -e NPM_CONFIG_CACHE=/tmp/.npm \
                                -e PUBLIC_API=\"$LOCAL_API\" \
                                -e LOCAL_API=\"$LOCAL_API\" \
                                -e REAL_API=\"$REAL_API\" \
                                -e ARTIFACT_NAME=\"$ARTIFACT_NAME\" \
                                -v \"$PWD\":/usr/src/app \
                                -w /usr/src/app \
                                node:20-alpine sh -lc '
                                    set -e
                                    apk add --no-cache jq zip bash coreutils findutils sed >/dev/null
                                    npm ci --no-audit --loglevel=error
                                    npx --yes astro@latest telemetry disable || true
                                    npm run build
                                    npm run astro -- check || true
                                    find dist -type f \( -name \"*.js\" -o -name \"*.mjs\" -o -name \"*.html\" -o -name \"*.css\" -o -name \"*.json\" -o -name \"*.txt\" \) -exec sed -i \"s~$LOCAL_API~$REAL_API~g\" {} +
                                    if grep -R \"$LOCAL_API\" dist >/dev/null 2>&1; then
                                        echo \"ERROR: references to the local API remain\"
                                        exit 1
                                    fi
                                    npm prune --omit=dev --no-audit --loglevel=error
                                    rm -rf node_modules/.cache || true
                                    zip -r \"$ARTIFACT_NAME\" dist .astro lambda package.json package-lock.json node_modules >/tmp/zip.log
                                    if [ ! -f \"$ARTIFACT_NAME\" ]; then
                                        echo \"ERROR: Zip artifact was not created\"
                                        exit 1
                                    fi
                                '
                        '''
                    }
                }
            }
        }

        stage('Archive Artifact') {
            steps {
                script {
                    env.STAGE_NAME = 'Archive Artifact'
                }
                dir('client') {
                    sh '''
                        set -e
                        if [ ! -f "$LAMBDA_ZIP" ]; then
                            echo "ERROR: Artifact $LAMBDA_ZIP was not found"
                            exit 1
                        fi
                    '''
                    archiveArtifacts artifacts: "${env.LAMBDA_ZIP}", fingerprint: true
                }
            }
        }

        stage('Deploy to Lambda') {
            steps {
                script {
                    env.STAGE_NAME = 'Deploy to Lambda'
                }
                withCredentials([aws(accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'prms-test-aws-creds', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    dir('client') {
                        sh '''
                            set -e
                            if [ ! -f "$LAMBDA_ZIP" ]; then
                                echo "ERROR: Artifact $LAMBDA_ZIP was not found"
                                exit 1
                            fi

                            aws lambda update-function-code \
                                --function-name "$LAMBDA_FUNCTION_NAME" \
                                --zip-file "fileb://$LAMBDA_ZIP" \
                                --publish \
                                --region "$AWS_REGION"
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            slackSend(
                color: '#00FF00',
                message: ":male-scientist::skin-tone-2: *[INNOVATION CATALOG]*: *(DEV)* - Frontend CI/CD succeeded :white_check_mark:",
                channel: "#notifications-platform",
                tokenCredentialId: 'slack-token',
                botUser: true,
                attachments: [[
                    title: "CI/CD Success Details",
                    color: "#00FF00",
                    fields: [
                        [title: "Stage", value: env.STAGE_NAME, short: true],
                        [title: "Job", value: env.JOB_NAME, short: true],
                        [title: "Build Number", value: env.BUILD_NUMBER, short: true],
                        [title: "Build URL", value: "<${env.BUILD_URL}|Click here>", short: false]
                    ]
                ]]
            )

            script {
                try {
                    def buildDate = new Date().format("yyyy-MM-dd HH:mm:ss")
                    getLastCommitInfo(
                        repoUrl: env.REPO_URL,
                        branch: env.BRANCH,
                        stage: env.STAGE_NAME,
                        buildNumber: env.BUILD_NUMBER,
                        buildDate: buildDate,
                        result: currentBuild.result ?: 'SUCCESS',
                        job: env.JOB_NAME,
                        url: env.BUILD_URL,
                        exception: ''
                    )
                } catch (Exception e) {
                    echo "Error retrieving commit information: ${e.message}"
                }
            }
        }
        failure {
            slackSend(
                color: '#FF0000',
                message: ":alert: :male-scientist::skin-tone-2: *[INNOVATION CATALOG]*: *(DEV)* - Frontend CI/CD failed: ${env.BUILD_EXCEPTION} :alert:",
                channel: "#notifications-platform",
                tokenCredentialId: 'slack-token',
                botUser: true,
                attachments: [[
                    title: "Build Failure Details",
                    color: "#FF0000",
                    fields: [
                        [title: "Stage", value: env.FAILED_STAGE ?: env.STAGE_NAME, short: true],
                        [title: "Job", value: env.JOB_NAME, short: true],
                        [title: "Build Number", value: env.BUILD_NUMBER, short: true],
                        [title: "Build URL", value: "<${env.BUILD_URL}|Click here>", short: false]
                    ]
                ]]
            )

            script {
                def buildDate = new Date().format("yyyy-MM-dd HH:mm:ss")
                try {
                    getLastCommitInfo(
                        repoUrl: env.REPO_URL,
                        branch: env.BRANCH,
                        stage: env.FAILED_STAGE ?: env.STAGE_NAME,
                        buildNumber: env.BUILD_NUMBER,
                        buildDate: buildDate,
                        result: currentBuild.result ?: 'FAILURE',
                        job: env.JOB_NAME,
                        url: env.BUILD_URL,
                        exception: env.BUILD_EXCEPTION ?: 'Unknown error'
                    )
                } catch (Exception e) {
                    echo "Error retrieving commit information: ${e.message}"
                }
            }
        }
    }
}

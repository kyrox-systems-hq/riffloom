import org.gradle.api.tasks.Copy

plugins {
    id("com.android.application")
}

val previewVersionCode = providers.gradleProperty("previewVersionCode").orElse("1").get().toInt()
val previewVersionName = providers.gradleProperty("previewVersionName").orElse("0.1.0-preview").get()
val previewKeystore = file("riffloom-preview.jks")

android {
    namespace = "com.kyroxsystems.riffloom.preview"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.kyroxsystems.riffloom.preview"
        minSdk = 26
        targetSdk = 35
        versionCode = previewVersionCode
        versionName = previewVersionName
    }

    signingConfigs {
        if (previewKeystore.exists()) {
            create("preview") {
                storeFile = previewKeystore
                storePassword = "riffloom-preview-only"
                keyAlias = "riffloom-preview"
                keyPassword = "riffloom-preview-only"
            }
        }
    }

    buildTypes {
        getByName("debug") {
            isMinifyEnabled = false
            if (previewKeystore.exists()) {
                signingConfig = signingConfigs.getByName("preview")
            }
        }
        getByName("release") {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro",
            )
            if (previewKeystore.exists()) {
                signingConfig = signingConfigs.getByName("preview")
            }
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    packaging {
        resources.excludes += setOf("META-INF/NOTICE.md", "META-INF/LICENSE.md")
    }
}

dependencies {
    implementation("androidx.webkit:webkit:1.16.0")
}

val webRoot = rootProject.projectDir.parentFile
val generatedAssets = layout.buildDirectory.dir("generated/riffloom-assets")
val prepareWebAssets = tasks.register<Copy>("prepareWebAssets") {
    from(webRoot) {
        include("*.html", "*.css", "*.js", "instruments/**", "LICENSE")
        exclude("android/**")
    }
    into(generatedAssets.map { it.dir("www") })
}

android.sourceSets.getByName("main").assets.srcDir(generatedAssets)
tasks.named("preBuild").configure { dependsOn(prepareWebAssets) }

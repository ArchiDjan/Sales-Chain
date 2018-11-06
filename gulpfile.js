var gulp          = require('gulp'), // Подключаем Gulp
    sass          = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync   = require('browser-sync'), // Подключаем Browser Sync
    concat        = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify        = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano       = require('gulp-cssnano'), // Модуль для сжатия css файлов
    rename        = require('gulp-rename'), // Модуль для переименования измененных файлов
    del           = require('del'), // Модуль для удаления файлов в папке
    imagemin      = require('gulp-imagemin'), // Модуль для сжатия картинок
    pngquant      = require('imagemin-pngquant'),
    cache         = require('gulp-cache'), // Модуль для кэширования картинок и ускорения работы модуля imagemin
    autoprefixer  = require('gulp-autoprefixer'); // Модуль для добавления вендорных префиксов в css стилях

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/sass/**/*.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Используем последние 15 версий браузеров для поддержки
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js/'));
});

gulp.task('csslibs', ['sass'], function() {
    return gulp.src('app/css/libs.css')
    .pipe(cssnano()) // сжимаем файл библиотеки
    .pipe(rename({suffix: '.min'})) // переименуем сжатый файл
    .pipe(gulp.dest('app/css/'));
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('clearCache', function() {
    return cache.clearAll();
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'csslibs', 'scripts'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

    var buildScc = gulp.src([
        'app/css/main.css',
        'app/css/media.css',
        'app/css/libs.min.css'
    ])
    .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});
## Out-of-the-box PHP Local Bridge bundle

This branch is supposed to help people who want something that works out-of-the-box using PHP.

### Usage

1. Download [current bundle](https://github.com/durasj/angular-filemanager/raw/bundle-php-local/bundle/master-2017-04-23.zip)
2. Extract archive somewhere where you can run PHP applications like on your hosting or htdocs directory on XAMPP (php-xml extension is required). If you don't have any, don't worry, check FAQ question [I don't have any PHP environment, how can I setup one?](https://github.com/durasj/angular-filemanager/tree/bundle-php-local#i-dont-have-any-php-environment-how-can-i-setup-one)
3. Open the directory where you extracted the archive in your browser
4. Enjoy. It's preconfigured to work with ./files directory at the root of the project

### FAQ

#### I don't have any PHP environment, how can I setup one?
The simplest way is to use PHP's built-in server:
1. First, you need to have PHP installed, you can do so by following some instructions on the internet, i.e. [how to install php on windows](https://www.google.sk/search?q=how+to+install+php+on+windows)
2. Extract bundle archive anywhere on your disk and navigate to that directory using cli (i.e. cmd.exe on win)
3. Type in `php -S localhost:8888` if you have PHP installed globally or `path/to/php -S localhost:8888` if not or `path/to/php.exe -S localhost:8888` on win platform
4. Open URL [localhost:8888](http://localhost:8888) in your browser

#### How can I change directory with files?
By default, ./files dir in the root of the project is used. You can easily change that by editing file `bridges/php-local/index.php`, line `$fileManagerApi = new FileManagerApi(__DIR__ . '/../../files');`

### Copyright and license
Developed in AngularJS with Material-Design styles by [Jonas Sciangula Street](https://github.com/joni2back).
Bundle and php local bridge by [Jakub Duras](https://github.com/jduras)

Code and documentation released under [the MIT license](https://github.com/joni2back/angular-filemanager/blob/master/LICENSE).


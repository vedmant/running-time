FROM php:8.2-fpm

# Install supervisor
RUN apt-get update && apt-get install -y git supervisor unzip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
        --install-dir=/usr/local/bin \
        --filename=composer

# Install Node
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update && apt-get install -y yarn

# Clean repository
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

CMD mkdir -p /app

WORKDIR /app

CMD ["/usr/bin/supervisord", "-n", "-c",  "/etc/supervisord.conf"]

Rails.application.routes.draw do
  root 'application#index'
  get  'about', to: 'application#about'
end

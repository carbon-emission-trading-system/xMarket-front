let message = ''
notifiSuccess()
{
  this.$notify({
    message: this.message,
    type: 'success'
  });
}
notifiFailed()
{
  this.$notify.error({
    message: this.message
  });
}
